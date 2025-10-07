/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { SystemProgram, Transaction,PublicKey } from "@solana/web3.js";
import { useState } from "react";

export const SendTokens = ()=>{
    const Wallet = useWallet();
    const {connection} = useConnection();
    const [Receiver,setReciever] = useState<string>("")
    const TransferToken = async()=>{
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey:Wallet.publicKey!,
            toPubkey:new PublicKey(Receiver),
            lamports:1 // Sending only 1 Lamports
        }))
        Wallet.sendTransaction(transaction,connection);
        
    }
    return <>
        <input onChange={(e)=>setReciever(e.target.value)} value={Receiver} placeholder="Enter Reciever's Address"/>
        <button onClick={()=>TransferToken()}>Send</button>
    </>
}