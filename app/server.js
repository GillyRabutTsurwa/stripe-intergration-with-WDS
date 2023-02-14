const path = require("path");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // NOTE: works well

const PORT = process.env.port || 3000;

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 100, name: "Learn React Today" }],
  [2, { priceInCents: 100, name: "Learn Vue Now" }],
]);

app.post("/checkout", async (request, response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", //NOTE: subscriptions is another common value
      line_items: request.body.items.map((currentItem) => {
        const storeItem = storeItems.get(currentItem.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: currentItem.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });

    response.json({
      url: session.url,
    });
  } catch (e) {
    response.status(500).json({
      error: e.message,
    });
  } finally {
    console.log("session finished");
  }
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
