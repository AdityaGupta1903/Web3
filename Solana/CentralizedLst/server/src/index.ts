import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import MintToAddress from "./MintTokenToSolAddress/mintoAddress.js";

const ReceivingAddress = "E6ZBqLqC6QDuhy17GBcuAdoP6WxQe9SZHDrN2G7c2p5z";

const app = express();
app.use(bodyParser.json());

app.post("/getTransactionDetails", async(req, res) => {
  console.log(req.body);
  console.dir(req.body, { depth: null, colors: true });
  let TransactionDetails = req.body;
  let SendersAddress = TransactionDetails.transaction.message.accountKeys[0];
  await MintToAddress(SendersAddress);
  res.send({ "Transaction Received": "True" });
});

app.listen(3001, (err) => {
  if (err) {
    console.log("Error Starting the server", err);
  } else {
    console.log("Server Started on port 3001");
  }
});

let sample = [
  {
    blockTime: 1760170079,
    indexWithinBlock: 0,
    meta: {
      err: null,
      fee: 80000,
      innerInstructions: [],
      loadedAddresses: { readonly: [], writable: [] },
      logMessages: [
        'Program ComputeBudget111111111111111111111111111111 invoke [1]',
        'Program ComputeBudget111111111111111111111111111111 success',
        'Program ComputeBudget111111111111111111111111111111 invoke [1]',
        'Program ComputeBudget111111111111111111111111111111 success',
        'Program 11111111111111111111111111111111 invoke [1]',
        'Program 11111111111111111111111111111111 success'
      ],
      postBalances: [ 426656800, 2069360000, 1, 1 ],
      postTokenBalances: [],
      preBalances: [ 856736800, 1639360000, 1, 1 ],
      preTokenBalances: [],
      rewards: []
    },
    slot: 413822340,
    transaction: {
      message: {
        accountKeys: [
          'ByNDptyMXGe6iyLjbz2stVe2jAdbq36zoLvHZ2NMXS5R',
          '1kUJt1WBPbQUhhh7qVyitje7BofvXwv5usFDxt7S8md',
          '11111111111111111111111111111111',
          'ComputeBudget111111111111111111111111111111'
        ],
        addressTableLookups: null,
        header: {
          numReadonlySignedAccounts: 0,
          numReadonlyUnsignedAccounts: 2,
          numRequiredSignatures: 1
        },
        instructions: [
          { accounts: [], data: '3b1H8Rq1T3d1', programIdIndex: 3 },
          { accounts: [], data: 'LKoyXd', programIdIndex: 3 },
          {
            accounts: [ 0, 1 ],
            data: '3Bxs4NK8nbZ2nEYF',
            programIdIndex: 2
          }
        ],
        recentBlockhash: '6DD4CcLgXFrPRdH8hucYx2cVfAFdfBUriBnMg2guDYRx'
      },
      signatures: [
        '5kLrqRfN3h21qr3bVYN6EQ9Vjp6om3DbpfVbnqzPe1Uge4zYsXb5CZhLgREsDGNphGEQexutH4a72XFUru2fmFxw'
      ]
    },
    version: 'legacy'
  }
]
