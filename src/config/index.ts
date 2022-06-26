import { providers } from "ethers";

import ERC20 from './ERC20.json';

const config = {
  multicall: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  erc20: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  localChain: "http://localhost:8545",
  abi: ERC20.abi
};

export const localChainProvider = new providers.StaticJsonRpcProvider(config.localChain);

export default config;