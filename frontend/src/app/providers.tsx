"use client";

import {ReactNode} from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiProvider } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { monadTestnet } from "wagmi/chains";


const {chains, publicClient} = configureChains(
    [monadTestnet],
    [alchemyProvider({ apiKey: "https://monad-testnet.g.alchemy.com/v2/MXMWpKnU54iZbtyCDZhwRdwpMEyRoq5e" })]
)
const { connectors } = getDefaultWallets({
    appName: "claimables",
    projectId: "3a882e00d37608ab3c3429584b7ed1d6",
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}