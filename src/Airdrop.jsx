import React from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { use } from 'react';
export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    async function handleAirdrop() {

        await connection.requestAirdrop(wallet.publicKey, 10);
        alert("Airdrop Successful");

    }

    return <div className="h-[70vh] w-[70vw] mt-12 flex flex-col space-y-4 items-center">

        <h4 className=' text-5xl font-bold text-black-400'>💦Soul Faucet💦</h4>
        <h5 className='font-semibold text-3xl '>Have a drink! The premium faucet for Solana Devnet and Testnet.</h5>
        <h5 className='font-semibold text-2xl '>This tool does *NOT* give real $SOL or Solana tokens.</h5>
        <input type="text" className='border border-gray-300 p-3 rounded-2xl w-4/5 text-center' placeholder="Enter Amount to Airdrop" />
        <button onClick={handleAirdrop} className='border border-gray-300 w-1/4 p-2 rounded-2xl bg-blue-100' >Request Airdrop </button>
    </div>
};