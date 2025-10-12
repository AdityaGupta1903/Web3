import { burn, createBurnInstruction, createMint,TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58"


const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
let Unit8ArrayFromPrivateKey = bs58.decode("3Gn9rHFpBh6rzrFocKdVc2WGa7z4UME6ZFiUYNUnEuNyrc7aP8DzTeY6cmhfqzYpPFJKzUPY5nrdmcSjp6D7enK5");
const Payer = Keypair.fromSecretKey(Unit8ArrayFromPrivateKey);

async function CreateNewMint(){
let NewMintAddress = await createMint(connection,Payer,Payer.publicKey,Payer.publicKey,9);
console.log(NewMintAddress.toString());
}

const MintedAddress = "E6ZBqLqC6QDuhy17GBcuAdoP6WxQe9SZHDrN2G7c2p5z";




