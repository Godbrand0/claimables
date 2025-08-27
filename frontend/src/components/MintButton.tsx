"use client"

type Props = {
    minted: boolean;
    mint: () => void;
}

export default function MintButton({minted, mint}: Props){
    return(
        <div>
            {!minted?(
                <button onClick={mint} className="bg-purple-800 transition hover:scale-105 duration-300 ease-in text-white px-5 cursor-pointer py-2 rounded w-[400px] ml-4">Mint NFT</button>
            ):(
                <p className="text-green-500">NFT Minted Successfully!</p>
            )}
        </div>
    )
}