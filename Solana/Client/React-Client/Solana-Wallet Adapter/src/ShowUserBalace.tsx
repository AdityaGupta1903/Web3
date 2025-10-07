/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const ShowUserBalance =()=>{
    const Wallet = useWallet();
    const Connection = useConnection();
    const [Balance,setBalance] = React.useState<number>();
    useEffect(()=>{
        const getBalance = async()=>{
            let balance = await Connection.connection.getBalance(Wallet.publicKey!);
            setBalance(balance);
        }
        getBalance();
    },[])
    return <div>
        <p>SOL Balance is: {Balance}</p>
    </div>
}