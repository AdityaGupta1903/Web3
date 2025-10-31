/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import * as web3 from "@solana/web3.js";
import { createAccount, getMinimumBalanceForRentExemptAccount } from "@solana/spl-token";
import * as borsh from "borsh"

class Counter {
  count: number;
  constructor(fields: { count: number }) {
    this.count = fields.count;
  }
}
const schema : borsh.Schema = {struct:{count:'u32'}}

const DataTobeStored = borsh.serialize(schema,new Counter({count:0})).length;
const ProgramId = new web3.PublicKey("4Y3EAHWaxFCLpZWAYT2r8T37y49zK2vxmYcw1KUAsCVE");

const Interact = () => {
  const wallet = useWallet();
  const { connection }= useConnection();

  async function CreateDataAccountAndStoreData(){

      const transaction = await connection.requestAirdrop(wallet.publicKey!,3*1000000000);
      await connection.confirmTransaction(transaction);

      let accountKeyPair = web3.Keypair.generate();  /// New Account Public Private Key

      let LamportsRequired = await connection.getMinimumBalanceForRentExemption(DataTobeStored); /// Get Minimum Rent Exemption to store the data.

      web3.SystemProgram.createAccount({
        fromPubkey:wallet.publicKey!,
        newAccountPubkey:accountKeyPair.publicKey,
        programId:ProgramId,
        space:DataTobeStored,
        lamports:LamportsRequired
      })
  }

  return (
    <>
      <button>Increment</button>
      <button>Decrement</button>
      <button>Create Data Account to store the data</button>
    </>
  );
};


export default Interact;
