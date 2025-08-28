"use client";

type Props = {
  contractAddress: string;
  totalSupply: number;
  totalMinted: number;
};

export default function NFTInfo({
  contractAddress,
  totalSupply,
  totalMinted,
}: Props) {
  return (
    <div className="p-4 text-sm italic font-bold space-y-4 flex flex-col">
      <h2 className="text-4xl font-extrabold ">A Monad Original</h2>
      <p>
        Dive into the world of Monad with an exclusive NFT, crafted just for
        you. Be part of the journey own a piece of the future today. MINT NOW!
      </p>
      <p className="text-gray-300 text-xs ">CA: {contractAddress}</p>
      <p className="text-gray-300">Total Supply: {totalSupply}</p>
      <p className="text-gray-300">Total Minted: {totalMinted}</p>
    </div>
  );
}
