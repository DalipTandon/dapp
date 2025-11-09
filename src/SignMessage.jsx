import React, { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";  //npm install @noble/curves@1.2.0
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const SignMessage=()=>{

    const [message,setMessage]=useState("");
    const {publicKey,signMessage}=useWallet();
   async function sign(){
         if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const encodedMessage=new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success');
        // console.log(bs58.encode(signature));
        setMessage("");
    }
    return(
         <div className="h-[60vh] w-1/2 flex flex-col  items-center space-y-3 ">
            <h4 className="font-extrabold text-5xl mb-4">Sign <span className="text-blue-500">Message</span> to Any Wallet</h4>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className="border bg-[#BBC863] rounded-2xl hover:border-blue-500 border-gray-300 w-2xl p-4" placeholder="Please Enter your Message" />
            <button onClick={sign} className="border rounded-2xl hover:scale-95 bg-white border-gray-300 w-md p-4">Sign Message</button>
        </div>
    )
}

export default SignMessage;