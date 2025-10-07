/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import axios from "axios";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Buffer } from 'buffer';
import { Transaction } from "@solana/web3.js";
import { VersionedTransaction } from "@solana/web3.js";

export const Swap = () => {
  const [SolAmout, setSolAmount] = React.useState<number>(0);
  const [RoutePlan,setRoutePlan] = React.useState<any>();
  const [UsdcAmount, setUsdcAmount] = React.useState<number>();
  const [TransactionSignature,setTransactionSignature] = React.useState<string>("");
  const Wallet = useWallet();
  const {connection} = useConnection();
  const CalculatePrice = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://lite-api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${SolAmout}`,
      headers: {
        Accept: "application/json",
      },
    };

    const response = await axios.request(config);
    setUsdcAmount(response.data.outAmount);
    setRoutePlan(response.data.routePlan)
  };
  const SwapToken = async () => {
    const data = JSON.stringify({
      userPublicKey: Wallet.publicKey?.toString(),
      quoteResponse: {
        inputMint: "So11111111111111111111111111111111111111112",
        inAmount: (SolAmout).toString(),
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        outAmount: (UsdcAmount)?.toString(),
        otherAmountThreshold: (UsdcAmount)?.toString(),
        swapMode: "ExactIn",
        slippageBps: 50,
        platformFee: null,
        priceImpactPct: "0",
        routePlan:RoutePlan,
      },
      prioritizationFeeLamports: {
        priorityLevelWithMaxLamports: {
          maxLamports: 10000000,
          priorityLevel: "veryHigh",
        },
      },
      dynamicComputeUnitLimit: true,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://lite-api.jup.ag/swap/v1/swap",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    setTransactionSignature(response.data.swapTransaction);
    /// Deserialize the Transaction
    const transactionBuffer = Buffer.from(response.data.swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(transactionBuffer);
     Wallet.sendTransaction(transaction,connection);
  };
  return (
    <div>
      <input
        onChange={(e) => {
          setSolAmount(Number(e.target.value));
        }}
        value={SolAmout}
        placeholder="Enter Sol To Exchange"
        type="number"
      />
      <div>The Amount of USDC {UsdcAmount}</div>
      <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
        <button onClick={() => CalculatePrice()}> Get Quotation</button>
        <button onClick={() => SwapToken()}>Swap Token</button>
        <div>Transaction Signature is {TransactionSignature}</div>
      </div>
    </div>
  );
};
