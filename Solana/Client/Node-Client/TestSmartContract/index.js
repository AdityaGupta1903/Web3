const { Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey, Keypair } = require("@solana/web3.js");

const connection = new Connection("http://localhost:8899","confirmed");
const programId = new PublicKey("BF5Thgqh2C6wXNJFA573bah46MmtHt6SjyXSoezhMphk");

connection.getEpochInfo().then((info)=>console.log(info))