const { createMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, Keypair } = require("@solana/web3.js");
const bs58 = require('bs58');

const connection = new Connection(clusterApiUrl('devnet'), "confirmed");

let publickKey = new PublicKey("1kUJt1WBPbQUhhh7qVyitje7BofvXwv5usFDxt7S8md");

async function AirDropSol(params) {
   let res =  await connection.requestAirdrop(publickKey,1000000);
   console.log(res);
}

AirDropSol();