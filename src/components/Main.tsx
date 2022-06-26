import { useEtherBalance, useEthers } from '@usedapp/core';
import { Contract, ethers } from 'ethers';
import React, { useEffect, useMemo, useRef, useState } from 'react'

import contractsConfig, { localChainProvider } from '../config';

const useContract = () => {
  const { account, library } = useEthers();
  return useMemo(() => new Contract(contractsConfig.erc20, contractsConfig.abi, account ? library?.getSigner() : localChainProvider),
    [account, library]
  );
}

export default function Main() {
  const inputRef = useRef<any>();
  const { account, deactivate, activateBrowserWallet } = useEthers();
  const ethBalance = useEtherBalance(account);
  const contract = useContract();
  const [metadata, setMetadata] = useState({
    name: "",
    symbol: ""
  });
  const [balance, setBalance] = useState("0");

  async function fetchMetadata() {
    if (!contract) return;
    const name = await contract.name();
    const symbol = await contract.symbol();
    setMetadata({ name, symbol });
  }

  async function fetchBalance() {
    if (!contract || !account) return;
    const balance = await contract.balanceOf(account);
    setBalance(ethers.utils.formatEther(balance));
  }

  async function getEth() {
    localChainProvider
      .getSigner()
      .sendTransaction({ to: account, value: ethers.utils.parseEther("1") });
  }

  async function mintTokens() {
    const tx = await contract.mint(ethers.utils.parseEther("100"));
    await tx.wait();
    fetchBalance();
  }

  async function sendTokens() {
    const tx = await contract.transfer(inputRef.current.value, ethers.utils.parseEther("50"));
    await tx.wait();
    fetchBalance();
  }

  useEffect(() => {
    fetchMetadata();
    fetchBalance();
  }, [contract, account]);

  return (
    <div className="border-2 mx-auto max-w-2xl px-4 py-4 mt-10">
      {account && (
        <>
          <p>Connected account: {account}</p>
          <p>ETH Balance: {ethers.utils.formatEther(ethBalance || "0")} ETH</p>
          <p>ERC20 balance: {balance}</p>
          <p>ERC20 name: {metadata.name}</p>
          <p>ERC20 symbol: {metadata.symbol}</p>
          <div className="my-4">
            <button className="bg-green-400 px-4 py-2 mr-3" onClick={getEth}>Get 1 ETH</button>
            <button className="bg-green-400 px-4 py-2 mr-3" onClick={mintTokens}>Mint 100 tokens</button>
          </div>
          <input type="text" className="px-4 py-2 border-2" ref={inputRef} />
          <button className="bg-green-400 px-4 py-2 mr-3 ml-3" onClick={sendTokens}>Send 50 tokens</button>
          <br />
          <button className="bg-red-500 px-4 py-2 mt-4" onClick={() => deactivate()}>Disconnect</button>
        </>
      )}
      {!account && <button className="bg-green-400 px-4 py-2" onClick={() => activateBrowserWallet()}>Connect</button>}
    </div>
  )
}