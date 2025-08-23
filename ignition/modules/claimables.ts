// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const _baseURI = "https://gateway.pinata.cloud/ipfs/bafkreih6zfowvdpqxdkfobybmif5lob2z26sjwjscz6w36dpdfm7bu6q5a";


const AirdropModule = buildModule("airdropModule", (m) => {

  const airdrop = m.contract("Airdrop", [_baseURI]);

  return { airdrop };
});

export default AirdropModule;
