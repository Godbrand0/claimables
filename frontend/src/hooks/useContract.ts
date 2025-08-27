"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../../artifacts/contracts/claimables.sol/Airdrop.json";

const contract_address = "0xf4E816Bb0564a517FA74C8704893bbaB8492758F";

export function useContract() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const prov = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x279f" }], // replace with Monad's real chainId in hex
          })
          .catch(async (switchError: any) => {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x279f", // Monad testnet chainId in hex
                    chainName: "Monad Testnet",
                    rpcUrls: ["https://testnet-rpc.monad.xyz"],
                    nativeCurrency: {
                      name: "MON",
                      symbol: "MON",
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://testnet.monadexplorer.com"],
                  },
                ],
              });
            }
          });
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
  console.log(contract);

  return { contractAddress: contract_address, address, contract, provider, connectWallet };
}
