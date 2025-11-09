import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";


const SendToken=()=>{
const[receiverAdd , setReceiverAdd]=useState("");
const[amount,setAmount]=useState("");
const wallet=useWallet();
const {connection}=useConnection();

async function sendToken(){

    const transaction=new Transaction();

    transaction.add(SystemProgram.transfer({
        fromPubkey:wallet.publicKey,
        toPubkey:new PublicKey(receiverAdd),
        lamports:amount * LAMPORTS_PER_SOL
    }));

    await wallet.sendTransaction(transaction,connection);
    alert("Sent " + amount + " SOL to " + receiverAdd);
    setAmount("");
    setReceiverAdd("");

}


    return(
        <div className="h-[60vh] w-1/2 flex flex-col  items-center space-y-3 ">
            <h4 className="font-extrabold text-5xl mb-4">Send <span className="text-blue-500">Token</span> to Any Wallet</h4>
            <input type="text" value={receiverAdd} onChange={(e)=>setReceiverAdd(e.target.value)} className="border bg-[#BBC863] rounded-2xl hover:border-blue-500 border-gray-300 w-2xl p-4" placeholder="Please Enter Public address were You want to send" />
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border bg-[#BBC863] rounded-2xl hover:border-blue-500 border-gray-300 w-2xl p-4" placeholder="Please Enter the amount you want to send" />
            <button onClick={sendToken} className="border rounded-2xl hover:scale-95 bg-white border-gray-300 w-md p-4">Send Token</button>
        </div>
    )
}

export default SendToken;