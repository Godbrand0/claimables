// app/page.tsx
"use client";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum: EIP1193Provider | undefined;
  }
}

import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet"; // Import the useWallet hook
import { ethers } from "ethers";
import ConnectButton from "../components/connectButton";
import MintButton from "../components/MintButton";
import NFTInfo from "../components/NFTInfo";
import Image from "next/image";

import NavBar from "@/components/navBar";
import abi from "../Airdrop.json";
import { EIP1193Provider } from "viem";

const contract_address = "0xf4E816Bb0564a517FA74C8704893bbaB8492758F";

export default function Home() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>(false);

  // Initialize contract when wallet is connected
  useEffect(() => {
    const initContract = async () => {
      if (!wallet.isConnected || !wallet.address || !window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(
          window.ethereum as EIP1193Provider
        );
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          contract_address,
          abi.abi,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initContract();
  }, [wallet.isConnected, wallet.address]);

  // Load supply data when contract is initialized
  const loadSupply = async () => {
    if (!contract) return;
    try {
      const total = await contract.getMaxSupply();
      const minted = await contract.getTotalSupply();
      setTotalSupply(total);
      setTotalMinted(minted);
    } catch (error) {
      console.error("Error loading supply:", error);
    }
  };

  // Mint function
  const mint = async () => {
    if (!contract || !wallet.address) return;
    try {
      const tx = await contract.claim();
      await tx.wait();
      setMinted(true);
      loadSupply();
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  useEffect(() => {
    if (contract) loadSupply();
  }, [contract]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-700 max-w-full">
      {!wallet.isConnected ? (
        <div>
          <ConnectButton connectWallet={connectWallet} />
        </div>
      ) : (
        <div>
          <NavBar address={wallet.address!} /> {/* Pass wallet address */}
          <div className="text-center md:flex justify-center items-center gap-3 max-w-full mx-3 mt-14">
            <Image
              src="/nft.jpeg"
              alt="NFT Image"
              width={300}
              height={300}
              className="rounded-lg shadow-lg border-2 border-purple-800 p-1 "
            />
            <div className="text-left bg-purple-900 h-[390px]  rounded-2xl md:w-[450px]  text-gray-300 shadow-2xl ">
              <NFTInfo
                contractAddress={contract_address}
                totalSupply={totalSupply}
                totalMinted={totalMinted}
              />
              <MintButton minted={minted} mint={mint} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
