/* eslint-disable @typescript-eslint/no-unused-vars */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirDrop(){

    const wallet = useWallet();
    const {connection} = useConnection();
    const [Amount,setAmount] = useState<number>(0);

    async function requestAirDrop() {
        connection.requestAirdrop(wallet.publicKey!,LAMPORTS_PER_SOL*Amount);
    }

    return <>
    <input placeholder="Enter Amount" onChange={(e)=>setAmount(Number(e.target.value))}/>
    <button onClick={()=>requestAirDrop()}>Request AirDrop</button>
    </>

}