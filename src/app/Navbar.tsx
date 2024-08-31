"use client";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Logo from "./assets/anchor-svgrepo-com.svg";

import { Dispatch, SetStateAction, useState } from "react";



const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

interface NavbarProps {
  isWalletConnected: Boolean;
  setIsWalletConnected: Dispatch<SetStateAction<Boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  isWalletConnected,
  setIsWalletConnected,
}) => {
  const [isWalletProfileClicked, setIsWalletProfileClicked] =
    useState<Boolean>(false);

  const handleWalletProfileClick = () => {
    setIsWalletProfileClicked(!isWalletProfileClicked);
    return;
  };
  const handleConnectWalletClick = () => {
    setTimeout(() => {}, 3000);
    setIsWalletConnected(true);
    return;
  };

  return (
    <>
      <div className="  m-2 p-6 h-24 flex justify-between items-center">
         <Image src={Logo} alt={""}></Image>

        <div
          className="
        text-3xl
        "
        >
          Solana Faucet
        </div>

        <div className="m-1 p-2 text-center   font-medium text-black rounded cursor-pointer"> 
          {/* <button>CONNECT WALLET</button> */}

          <WalletMultiButton />
          {/* <WalletDisconnectButton></WalletDisconnectButton> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
