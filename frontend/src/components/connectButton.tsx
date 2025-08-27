"use client";

type Props = {
  connectWallet: () => void;
};

export default function ConnectButton({ connectWallet }: Props) {
  return (
    <button
      onClick={connectWallet}
      className="cursor-pointer px-4 py-2 text-2xl bg-blue-900 text-gray-300 rounded-lg"
    >
      Connect Wallet
    </button>
  );
}
