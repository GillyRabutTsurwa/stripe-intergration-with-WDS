require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const stripe = require("stripe");
stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [
    [1, { priceInCents: 10000, name: "Learn React with Kyle" }],
    [3, { priceInCents: 20000, name: "CSS & Hair Tutorial" }],
  ],
]);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
