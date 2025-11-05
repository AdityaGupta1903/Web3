/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as React from "react";
import * as web3 from "@solana/web3.js";
import {
  createAccount,
  getMinimumBalanceForRentExemptAccount,
} from "@solana/spl-token";
import * as borsh from "borsh";
import { Buffer } from "buffer";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

class Counter {
  count: number;
  constructor(fields: { count: number }) {
    this.count = fields.count;
  }
}
const schema: borsh.Schema = { struct: { count: "u32" } };

const DataTobeStored = borsh.serialize(schema, new Counter({ count: 0 }));
const ProgramId = new web3.PublicKey(
  "HP8udjVPqMX1w6enSK4hH4XvEXKUynbr6gRGyj5c7XnV"
);

const Interact = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function CreateDataAccountAndStoreData() {
    // await connection.requestAirdrop(
    //   wallet.publicKey!,
    //   1 * LAMPORTS_PER_SOL
    // );
    

    let accountKeyPair = web3.Keypair.generate(); /// New Account Public Private Key

    let LamportsRequired = await connection.getMinimumBalanceForRentExemption(
      DataTobeStored.length
    ); /// Get Minimum Rent Exemption to store the data.

    let CreateNewDataAccount = web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey!,
      newAccountPubkey: accountKeyPair.publicKey,
      programId: ProgramId,
      space: DataTobeStored.length,
      lamports: LamportsRequired,
    });
    let StoreDataInTheAccount = new web3.TransactionInstruction({
      keys: [
        { pubkey: accountKeyPair.publicKey, isSigner: false, isWritable: false },
      ],
      programId: ProgramId,
      data: Buffer.from(DataTobeStored),
    });
    let Transaction = new web3.Transaction().add(
      CreateNewDataAccount,
      StoreDataInTheAccount
    );

    return Transaction;
  }

  async function InteractWithSmartContract() {
    let transaction = await CreateDataAccountAndStoreData();
    try {
      wallet.sendTransaction(transaction, connection);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button>Increment</button>
      <button>Decrement</button>
      <button
        onClick={() => {
          InteractWithSmartContract();
        }}
      >
        Create Data Account to store the data
      </button>
    </>
  );
};

export default Interact;
