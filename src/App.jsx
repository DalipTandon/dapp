import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useMemo ,useState} from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Airdrop';
import { BrowserRouter, Route, Routes } from 'react-router';
import SendToken from './SendToken';
import SignMessage from './SignMessage';

function App() {
  const network = WalletAdapterNetwork.Devnet;  //this is used to define the network

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter()
    ],
    [network]
  );

  return (
    
    
   <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
          <div className="h-screen bg-[#B0CE88]  flex flex-col items-center justify-center space-y-6">
            <div className='mb-10 flex flex-col space-y-5 items-end w-full  mr-24'>
            <WalletMultiButton />
            <WalletDisconnectButton />
            </div>
            <Routes>
          <Route path={"/"} element={<Airdrop/>}/>
          <Route path='/sendtoken' element={<SendToken/>} />
          <Route path='/signmessage' element={<SignMessage/>} />
            </Routes>
          </div>
           </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
   
  )
}

export default App
