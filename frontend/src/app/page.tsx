"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../../artifacts/contracts/claimables.sol/Airdrop.json";





const contract_address = "0xA727C7aED72a3e4d9b79A23204C6CAd978045fC1";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const [minted, setMinted] = useState<boolean>(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const prov = new ethers.BrowserProvider(window.ethereum);
        const accounts = await prov.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
        setProvider(prov);

        const signer = await prov.getSigner();
        const nftContract = new ethers.Contract(
          contract_address,
          abi.abi,
          signer
        );
        setContract(nftContract);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("please install metamask");
    }
  };

  const loadSupply = async () => {
    if (!contract) return;
    try {
      const total = await contract.getMaxSupply();
      const minted = await contract.getTotalSupply();
      setTotalSupply(total.toNumber());
      setTotalMinted(minted.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  const mint = async () => {
    if (!contract || !address) return;
    try {
      const tx = await contract.claim(address);
      await tx.wait();
      setMinted(true);
      loadSupply();
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      loadSupply();
    }
  }, [contract]);

  return (
    <main>
      {!address ? (
        <div>
          <button onClick={connectWallet}>connectWallet</button>
        </div>
      ) : (
        <div>
          <p>Connected as: {address}</p>
          <p>Total Supply: {totalSupply}</p>
          <p>Total Minted: {totalMinted}</p>
          {!minted ? (
            <button onClick={mint}>Mint</button>
          ) : (
            <p>You have already minted!</p>
          )}
        </div>
      )}
    </main>
  );
}
