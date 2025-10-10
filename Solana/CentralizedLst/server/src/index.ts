import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/getTransactionDetails", (req, res) => {
  console.log(req.body);
  res.send({ "Transaction Received": "True" });
});

app.listen(3001, (err) => {
  if (err) {
    console.log("Error Starting the server", err);
  } else {
    console.log("Server Started on port 3001");
  }
});
