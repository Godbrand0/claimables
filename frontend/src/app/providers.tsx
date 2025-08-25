// "use client";

// import {ReactNode} from "react";
// import "@rainbow-me/rainbowkit/styles.css";
// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { createClient } from 'viem'

// import {createConfig, WagmiProvider } from "wagmi";
// import { http } from 'viem'
// import { monadTestnet } from "wagmi/chains";



// const config = createConfig({
  
//   chains: [ monadTestnet], 
//   transports: { 

//     [monadTestnet.id]: http("https://monad-testnet.g.alchemy.com/v2/MXMWpKnU54iZbtyCDZhwRdwpMEyRoq5e"), 
//   }, 
// })
// const { connectors } = getDefaultWallets({
//     appName: "claimables",
//     projectId: "3a882e00d37608ab3c3429584b7ed1d6",
// });

// const wagmiConfig = createConfig({
   
//     connectors,
//     config,
// })



// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <WagmiProvider config={wagmiConfig}>
//       <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
//     </WagmiProvider>
//   );
// }