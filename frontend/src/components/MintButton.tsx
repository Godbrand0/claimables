"use client";

// components/MintButton.tsx
import React from "react";

type Props = {
  minted: boolean;
  mint: () => Promise<void>; // Updated to reflect async function
 
};

export default function MintButton({ minted, mint }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={mint}
        disabled={minted} // Disable when minted
        className={`bg-gray-300 font-bold transition hover:scale-105 duration-300 ease-in text-purple-900 px-5 py-2 rounded w-[300px] md:w-[400px] ml-4 mt-9
          ${minted ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-gray-300 hover:bg-purple-900"}`}
        aria-label={minted ? "NFT Minted" : "Mint NFT"}
        aria-disabled={minted}
      >
        { minted ? "Minted!" : "Mint NFT"}
      </button>
      <p className="text-gray-300 text-xs italic ">you can only mint one NFT per wallet</p>
    </div>
  );
}
