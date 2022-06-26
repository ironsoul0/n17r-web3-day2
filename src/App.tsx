import React from 'react'
import { Mainnet, DAppProvider, Config, ChainId, Hardhat } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

import contractsConfig, { localChainProvider } from './config';
import Main from './components/Main'

const config: Config = {
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Hardhat.chainId]: localChainProvider
  },
  multicallAddresses: {
    [ChainId.Hardhat]: contractsConfig.multicall
  },
}

export default function App() {
  return (
    <DAppProvider config={config}>
      <Main />
    </DAppProvider>
  )
}