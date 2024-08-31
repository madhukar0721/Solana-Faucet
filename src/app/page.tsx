"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./hero";
import { useEffect, useState } from "react";

import AppWalletProvider from "./components/AppWalletProvider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState<Boolean>(false);
  

  useEffect(()=>{



  },[]);
  
  return (
    <>
      

      <AppWalletProvider>
      <Navbar
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
      />
        <Hero />
      </AppWalletProvider>
    </>
  );
}
