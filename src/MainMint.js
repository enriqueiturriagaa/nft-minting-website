import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import g2Punks from "./G2Punks.json";

const g2PunksNFTAddress = "0xc21F2465d10711C3dbECd9073c25993fC2171Cb6";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        g2PunksNFTAddress,
        g2Punks.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response:", response);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      <h1>G2Punks</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        malesuada lacus sit amet lorem lacinia, a finibus erat lobortis. Fusce
        mollis metus nunc, iaculis malesuada urna blandit rhoncus. Nulla luctus
        eu ex et faucibus. Vestibulum vehicula velit vitae libero maximus
        posuere vitae nec sem. Ut at enim nisi.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now!</button>
        </div>
      ) : (
        <p>You must be connected to mint</p>
      )}
    </div>
  );
};

export default MainMint;
