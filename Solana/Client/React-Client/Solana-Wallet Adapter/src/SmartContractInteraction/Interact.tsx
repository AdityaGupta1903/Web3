/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import * as web3 from "@solana/web3.js";
import { createAccount } from "@solana/spl-token";
import * as borsh from "@coral-xyz/borsh";
const Interact = () => {
  const wallet = useWallet();
  const connction = useConnection();

  async function CreateNewDataAccount() {
    const counterSchema = borsh.struct([borsh.u32("count")]);
  }

  return (
    <>
      <button>Increment</button>
      <button>Decrement</button>
      <button>Create Data Account to store the data</button>
    </>
  );
};

class Counter {
  count: number;
  constructor(fields: { count: number }) {
    this.count = fields.count;
  }
}

export default Interact;
