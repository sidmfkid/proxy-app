require("dotenv").config();

const express = require("express");
const shopifyAPI = require("shopify-node-api");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const nonce = require("nonce")();
const btaSdk = require("./bta/index");
const {
  API_KEY,
  API_SECRET_KEY,
  SHOP,
  BTA_API_KEY,
  BTA_API_KEY_SECRET,
  BTA_API_TOKEN,
} = process.env;

let authPromise = btaSdk.auth({
  key: BTA_API_KEY,
  password: BTA_API_KEY_SECRET,
});

const btaApi = btaSdk.init(BTA_API_TOKEN);

console.log("sdk methods here", btaSdk);

console.log("here should be 404 due to no key", authPromise);

console.log(btaApi);

const scopes = [
  "read_products",
  "write_products",
  "read_assigned_fulfillment_orders",
  "write_assigned_fulfillment_orders",
  "read_content",
  "write_content",
  "read_inventory",
  "write_inventory",
  "read_orders",
  "write_orders",
  "read_price_rules",
  "write_price_rules",
];

const state = nonce();

const shopifyConfig = {
  shop: SHOP,
  shopify_api_key: API_KEY,
  shopify_shared_secret: API_SECRET_KEY,
  shopify_scope: scopes,
  redirect_uri: process.env.PORT + "/finish_auth",
  nonce: state,
};

const Shopify = new shopifyAPI(shopifyConfig);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ strict: true }));

app.use(function (req, res, next) {
  try {
    res.setHeader("Content-Type", "application/json");
  } catch (error) {
    console.log(error, "MIDDLEWARE ERROR!!");
  }
  next();
});

app.get("/", (req, res) => {
  try {
    const auth_url = Shopify.buildAuthURL();
    // res.send("Hello world!");
    res.redirect(auth_url);
  } catch (error) {
    console.log(error, "Error!");
  }
});

app.get("/finish_auth", (req, res) => {
  const Shopify = new shopifyAPI(shopifyConfig),
    query_params = req.query;
  Shopify.exchange_temporary_token(query_params, function (err, data) {
    // This will return successful if the request was authentic from Shopify
    // Otherwise err will be non-null.
    // The module will automatically update your config with the new access token
  });
});

app.get("/blocks", (req, res) => {
  res.send("hello");
});

app.get("/app_proxy", (req, res) => {
  console.log(req.body);
  res.send(req.body);
  res.status(200).end();
});

app.post("/app_proxy/blocks", async (req, res) => {
  console.log(req.body);
  const blocks = await btaApi.getBlocks(req.body).then(async (response) => {
    return await response.data.blocks;
  });

  console.log(blocks, "BLocks");
  res.json({ blocks: blocks });
  res.status(200).end();
});

app.listen(process.env.PORT || 80, () => {
  console.log("your app is now listening on port");
});
