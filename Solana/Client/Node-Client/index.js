const { createMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, Keypair } = require("@solana/web3.js");
const bs58 = require('bs58');

const connection = new Connection(clusterApiUrl('devnet'), "confirmed");

// Load your wallet from secret key
let PrivateKeyArray = new Uint8Array([200,198,223,132,64,69,122,129,56,155,125,139,23,60,209,180,68,13,28,39,172,102,247,228,1,100,70,79,165,19,13,90,243,2,132,194,97,115,76,18,119,211,8,31,120,139,149,42,227,142,111,222,50,50,247,245,193,244,95,1,153,48,170,216]);
let KeyPair = Keypair.fromSecretKey(PrivateKeyArray);

console.log("Public Key:", KeyPair.publicKey.toBase58());
console.log("Private Key:", bs58.encode(PrivateKeyArray));

async function airdrop(publicKey, amount) {
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
    await connection.confirmTransaction(airdropSignature, "confirmed");
    console.log("Airdrop complete:", airdropSignature);
}

// Create a new mint
async function createMintForToken() {
    // Make sure you have SOL for rent-exemption
    //await airdrop(KeyPair.publicKey, LAMPORTS_PER_SOL);

    const mint = await createMint(
    connection,
    KeyPair,                  // payer
    KeyPair.publicKey,        // mintAuthority
    KeyPair.publicKey,        // freezeAuthority (or null)
    6                         // decimals
);

    console.log('Mint Created at:', mint.toBase58());

    // Creating Associated Token Account for this

    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection,KeyPair,mint,new PublicKey(KeyPair.publicKey));
    console.log('Token Account Created at ',tokenAccount.address.toBase58());


    await mintTo(connection,KeyPair,mint,tokenAccount.address,KeyPair,1);
    console.log('Minted 1', 'tokens to', tokenAccount.address.toBase58())


    return mint;
}

createMintForToken();
