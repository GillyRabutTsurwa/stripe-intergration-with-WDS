require("dotenv").config();
const PORT = 5000;

//NOTE: setup express
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

//NOTE: setup stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
console.log(stripe); //NOTE: to verify that the express setup works

//NOTE: setup our store items. using maps instead of arrays or objects
/**
 * in a real world application, this data usually comes from a database
 * always server side, never client side
 * you don't send the price from the client
 */
const storeItems = new Map([
    [1, { priceInCents: 10_000, name: "Learn React Today" }],
    [2, { priceInCents: 20_000, name: "CSS Masterclass" }],
]);

console.log(storeItems);

//NOTE: make our application work
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
