"use client";
import  shorten  from "./shorten";

type Props = {
  address: string;
  
};

export default function NavBar({ address }: Props) {
    const userAddress = shorten(address);
  return (
    <nav className="fixed w-full p-4 shadow-2xl bg-purple-950 top-0 left-0 flex justify-between">
      <h2 className="text-lg font-bold">A Monad Original</h2>
      <p className="px-4 py-2 rounded-lg font-bold bg-white text-purple-700 ">Connected: {userAddress}</p>
    </nav>
  );
}

  
