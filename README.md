<img src=".github/n17r.png" alt="Foundry logo" align="right" width="120" />

# N17R - Web3, Day 2

This repo shows an example of how you can communicate with your smart contracts through front-end application. We use `React.js` and `useDapp` to showcase how this can be achieved.

Please go through [Day 1](https://github.com/ironsoul0/n17r-web3-day1) repo first since it is going to be needed.

## Setup

This project was bootstrapped using simple `creare-react-app` CLI.

### Install

```bash
git clone https://github.com/ironsoul0/n17r-web3-day2
cd n17r-web3-day2
yarn
```

### Config

In order to successfully run this application on your device, you have to correctly fill `src/config/index.ts` file. Mainly you are interested in replacing `config.multicall` and `config.erc20` with respective addresses of contracts deployed to your local `hardhat` chain.

Go through the `README` of Day 1 to find out how to deploy your contracts.

### Metamask

This application assumes that you have `Hardhat` chain configured in your Metamask with the following configs:

- RPC URL: `http://localhost:8545`
- Chain ID: `31337`

### Links

Please refer to these docs for further understanding of how to build frontend for Web3:

- [useDapp](https://usedapp-docs.netlify.app/docs)
- [wagmi](https://wagmi.sh/)

