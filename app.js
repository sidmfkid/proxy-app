require("dotenv").config();

const express = require("express");
const shopifyAPI = require("./node_modules/shopify-node-api/lib/shopify");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const nonce = require("nonce")();
const btaSdk = require("./bta/index");
const query = require("express/lib/middleware/query");
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
  redirect_uri: process.env.DEVPORT + "/finish_auth",
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
    // console.log(auth_url);
    res.redirect(auth_url);
  } catch (error) {
    console.log(error, "Error!");
  }
});

app.get("/home", (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    console.log(error, "Error!");
  }
});

app.post("/webhook", async (req, res) => {
  console.log(req);

  res.send("allgood");
  res.status(200).end();
});

app.get("/hooks", (req, res) => {
  console.log(req);
  // const Shopify = new shopifyAPI({shopName: '24k-nail-spa', accessToken: });

  // console.log();

  res.send("allgood");
  res.status(200).end();
});

app.get("/finish_auth", (req, res) => {
  var Shopify = new shopifyAPI(shopifyConfig),
    query_params = req.query;
  console.log(query_params, "before exchange");
  Shopify.exchange_temporary_token(query_params, function (err, data) {
    // This will return successful if the request was authentic from Shopify
    // Otherwise err will be non-null.
    // The module will automatically update your config with the new access token
    console.log(query_params, "in exchange");
  });
  Shopify.is_valid_signature(query_params);
  Shopify.set_access_token(query_params.code);
  Shopify.get("/admin/products.json", function (err, data, headers) {
    console.log(data); // Data contains product json information
    console.log(headers); // Headers returned from request
  });
  res.send("hello");
});

function callback(err, data, headers) {
  var api_limit = headers["http_x_shopify_shop_api_call_limit"];
  console.log(api_limit); // "1/40"
}

app.get("/blocks", (req, res) => {
  const Shopify = new shopifyAPI({
    shop: process.env.SHOP,
    shopify_api_key: process.env.API_KEY,
    shopify_shared_secret: process.env.API_SECRET_KEY,
    access_token:
      "de39ac2941903c94610c2978082c7b14b95ff49d5fadd5fcce27d8502b7e0a26",
  });

  console.log(Shopify);

  console.log(req.query);
  res.send("hello there");
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

  // const staff = await btaApi.getBlocks(req.body).then(async (response) => {
  //   return await response.data.;
  // });

  console.log(blocks, "BLocks");
  res.json({ blocks: blocks });
  res.status(200).end();
});

app.post("/app_proxy/bta-products", async (req, res) => {
  console.log(req.body);
  const shopifyProductID = req.body.id;

  const btaProducts = await btaApi.getProducts().then(async (response) => {
    return await response.data.products;
  });

  let productResources;
  btaProducts.forEach((item, i) => {
    if (item.external_id === shopifyProductID) {
      productResources = item.resources;
    }
  });
  console.log(btaProducts);
  console.log(productResources);

  // const blocks = await btaApi.getBlocks(req.body).then(async (response) => {
  //   return await response.data.blocks;
  // });

  // const staff = await btaApi.getBlocks(req.body).then(async (response) => {
  //   return await response.data.;
  // });

  // console.log(blocks, "BLocks");
  res.json({ staff: productResources });
  res.status(200).end();
});

app.listen(process.env.PORT || 80, () => {
  console.log("your app is now listening on port");
});
