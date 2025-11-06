import React from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount ]= useState("");
    async function handleAirdrop() {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        const solAmount = parseFloat(amount);
        if (isNaN(solAmount) || solAmount <= 0) {
            alert("Enter a valid positive number for SOL amount.");
            return;
        }
                // console.log(amount);

        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                solAmount * LAMPORTS_PER_SOL
            );
            alert(`✅ Airdrop successful! You received ${solAmount} SOL.`);
        } catch (err) {
            console.error(err);
            alert("❌ Airdrop failed due to too many request. Please try again later.");
        }

    }

    return <div className="h-[70vh] w-[70vw] mt-12 flex flex-col space-y-4 items-center">

        <h4 className=' text-5xl font-bold text-black-400 text-[#2F5755]'>💦Soul Faucet💦</h4>
        <h5 className='font-semibold text-3xl '>Have a drink! The premium faucet for Solana Devnet and Testnet.</h5>
        <h5 className='font-semibold text-2xl text-[#DD0303] '>This tool does *NOT* give real $SOL or Solana tokens.</h5>
        <input  type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}  className='border bg-[#BBC863] font-bold border-gray-300 p-3 rounded-2xl w-4/5 text-center' placeholder="Enter Amount to Airdrop" />
        <button onClick={handleAirdrop} className='border border-gray-300 w-1/4 p-2 rounded-2xl bg-blue-100 hover:scale-90' >Request Airdrop </button>

        <div className="mt-8 w-full flex justify-center">
            <div className=" from-pink-500 via-red-500 to-yellow-400 rounded-2xl shadow-lg p-6 max-w-3xl text-center text-white space-y-4 transform transition hover:scale-[1.02]">
                <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
                    Why does this exist? <span className="text-yellow-200">Because why not!!</span>
                </h2>
                <p className="text-lg opacity-90">
                    hehe just wanna have some fun with <span className="font-semibold text-yellow-100">Solana Devnet</span> and <span className="font-semibold text-yellow-100">Testnet</span>.
                </p>
                <p className="text-lg opacity-90">
                    You can use this faucet to get free <span className="text-yellow-200 font-semibold">SOL</span> for
                    <span className="block font-medium text-yellow-100 mt-1">
                        testing and development purposes on the Solana blockchain.
                    </span>
                </p>
            </div>
        </div>

    </div>
};