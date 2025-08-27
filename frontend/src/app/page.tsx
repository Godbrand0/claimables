"use client";

import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import ConnectButton from "../components/connectButton";
import MintButton from "../components/MintButton";
import NFTInfo from "../components/NFTInfo";
import Image from "next/image";
import "./globals.css";
import NavBar from "@/components/navBar";

export default function Home() {
  const { contractAddress, address, contract, connectWallet } = useContract();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>(false);

  // async function getDeployedBytecode() {
  //   if (!provider) return;
  //   try {
  //     const code = await provider.getCode(contract_address);
  //     console.log("Deployed bytecode length:", code.length);
  //   } catch (error) {
  //     console.error("Error fetching bytecode:", error);
  //   }
  // }
  // getDeployedBytecode();

  const loadSupply = async () => {
    if (!contract) return;
    try {
      const total = await contract.getMaxSupply();
      const minted = await contract.getTotalSupply();
      setTotalSupply(total);
      setTotalMinted(minted);
    } catch (error) {
      console.error(error);
    }
  };

  const mint = async () => {
    if (!contract || !address) return;
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
    <main className="flex flex-col items-center justify-center h-screen bg-blue-700">
      {!address ? (
        <div>
          <ConnectButton connectWallet={connectWallet} />
        </div>
      ) : (
        <div>
          <NavBar address={address} />
          <div className="text-center flex justify-center items-center gap-3">
            <Image
              src="/nft.jpeg"
              alt="NFT Image"
              width={300}
              height={300}
              className="rounded-lg shadow-lg border-2 border-purple-800 p-1"
            />
            <div className="text-left">
              <NFTInfo
                contractAddress={contractAddress}
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
