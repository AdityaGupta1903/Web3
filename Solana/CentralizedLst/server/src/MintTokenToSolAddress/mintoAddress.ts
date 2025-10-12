import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58"

const MintedAddress = "E6ZBqLqC6QDuhy17GBcuAdoP6WxQe9SZHDrN2G7c2p5z";
const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
const Payer = Keypair.fromSecretKey(bs58.decode("3Gn9rHFpBh6rzrFocKdVc2WGa7z4UME6ZFiUYNUnEuNyrc7aP8DzTeY6cmhfqzYpPFJKzUPY5nrdmcSjp6D7enK5"));


async function MintToAddress(RecipientAddress:string) {
    let getAssociatedTokenAddress = await getOrCreateAssociatedTokenAccount(connection,Payer,new PublicKey(MintedAddress),new PublicKey(RecipientAddress));
    console.log("Associated Token Account for the Mint",getAssociatedTokenAddress.address.toString());
    let TransactionSignature = await mintTo(connection,Payer,new PublicKey(MintedAddress),getAssociatedTokenAddress.address,Payer,1000000000);
    console.log(TransactionSignature);
}

export default MintToAddress;