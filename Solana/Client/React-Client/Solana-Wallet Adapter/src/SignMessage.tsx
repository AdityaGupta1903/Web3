/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";

export const SignMessage = () => {
  const {publicKey,signMessage} = useWallet();
  const [Message,setMessage] = React.useState<string>();
  const SignMessage = async() => {
     if (!publicKey) {
      alert("Wallet not connected!");
      return;
    }
    if (!signMessage) {
      alert("Wallet does not support message signing!");
      return;
    }

    const encodedMessage = new TextEncoder().encode(Message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert("Message signature invalid!");
      return;
    }
    alert(`Message signature: ${bs58.encode(signature)}`);
  }
  return (
    <>
      <input placeholder="Enter Message" />
      <button>Sign</button>
    </>
  );
};
