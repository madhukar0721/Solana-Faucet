import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import Modal from "./components/Modal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Hero = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [txHash, setTxHash] = useState("");
  const [isAirdropped, setIsAirdropped] = useState(false);

  const [balance, setBalance] = useState<number>(0);
  const [solAirdrop, setSolAirdrop] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const [modal, setModal] = useState<string>("");

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  useEffect(() => {}, [solAirdrop]);

  const handleonClickModal = (prop: string) => {
    if (!publicKey) {
      setModal("please_connect_wallet");
      return;
    }
    setModal(prop);
    return;
  };

  const closeModal = () => setModal("");

  const handleModalSubmit = async () => {
    if (modal === "airdrop_sol") {
      
      const airdropAmount = parseFloat(inputValue);
      if (isNaN(airdropAmount) || airdropAmount <= 0) {
        console.error("Invalid SOL amount");
        return;
      }
  
      // Convert SOL to lamports
      const sol = airdropAmount * LAMPORTS_PER_SOL;
      console.log("Amount in lamports:", sol);
  
      if (publicKey) {
        try {
          // Request airdrop
          const txhash = await connection.requestAirdrop(publicKey, sol);
          setTxHash(txhash);
          setIsAirdropped(true);
          console.log(`Airdrop Transaction Hash: ${txhash}`);
        } catch (error) {
          console.error("Error requesting airdrop:", error);
        }
      } else {
        console.error("PublicKey is not defined.");
      }
      setInputValue("")
      setModal(""); // Optionally close the modal after submission
    }
  };
  

  const renderModalContent = () => {
    switch (modal) {
      case "show_sol_bal":
        return (
          <div className=" text-black">Your SOL Balance: {balance} SOL</div>
        );
      case "airdrop_sol":
        return (
          <div>
            <div className=" text-black">
              How many SOL do you want to Airdrop?
            </div>
            <input
              className="border-black border-2 "
              type="number"
              placeholder="Enter amount"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        );
      case "sign_message":
        return (
          <div className=" text-black">
            Sign a message functionality coming soon.
          </div>
        );
      case "send_sol":
        return (
          <div className=" text-black">Send SOL functionality coming soon.</div>
        );
      case "please_connect_wallet":
        return (
          <div className=" text-black">
            Please connect your wallet to continue.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="m-5 p-5 h-[85vh]">
        <div className=" mt-20 flex flex-col justify-center items-center gap-10">
          <div className="w-3/4 h-12">
            <input
              className="w-full h-full rounded-lg text-black outline:none text-center"
              type="text"
              placeholder={"your Solana Public Address will show here"}
              defaultValue={publicKey?.toString() || ""}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <Button onClick={() => handleonClickModal("show_sol_bal")}>
              Show SOL Balance
            </Button>
            <Button onClick={() => handleonClickModal("airdrop_sol")}>
              Request Airdrop
            </Button>
            <Button onClick={() => handleonClickModal("sign_message")}>
              Sign a message
            </Button>
            <Button onClick={() => handleonClickModal("send_sol")}>
              Send SOL
            </Button>
          </div>
          {modal && (
            <Modal
              isOpen={!!modal}
              solAirdrop={solAirdrop}
              setSolAirdrop={setSolAirdrop}
              onClose={closeModal}
              onSubmit={modal === "airdrop_sol" ? handleModalSubmit : undefined}
            >
              {renderModalContent()}
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
