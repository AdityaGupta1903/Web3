/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

export const TokenLaunchPad = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const getTransaction = async () => {
    /// Creating the mint First
    const MinimumBalanceForRentExcemption =
      await token.getMinimumBalanceForRentExemptAccount(connection);
    let accountKeyPair = web3.Keypair.generate();  /// New Account Public Private Key
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.createAccount({
        //@ts-ignore
        fromPubkey: wallet.publicKey, /// Who is creating the Account
        newAccountPubkey: accountKeyPair.publicKey,
        space: token.MINT_SIZE,
        lamports: MinimumBalanceForRentExcemption,
        programId: token.TOKEN_PROGRAM_ID,
      }),
      token.createInitializeMintInstruction(
        accountKeyPair.publicKey,
        6,
        accountKeyPair.publicKey,
        accountKeyPair.publicKey,
        token.TOKEN_PROGRAM_ID
      )
    );

    return transaction;
  };

  const MintToken = async () => {
    let transaction = await getTransaction();

    if (wallet) {
      wallet?.sendTransaction(transaction,connection)
    } else {
      console.error("Wallet is not defined");
    }
  };

  return (
    <div
      onClick={() => {
        MintToken();
      }}
    >
      Create a new Token
    </div>
  );
};
