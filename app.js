/**
 * This is the Hello world example from Express
 * https://expressjs.com/en/starter/hello-world.html
 */

/**
 * Express Server Config and Initialization
 */
const express = require("express");
const app = express();
const port = 3000;

// Allows us to read values from ".env" file.
require("dotenv").config();

/**
 * First, copy the .env.EXAMPLE file to a .env file.
 * Then, fill in your values in that file.
 */
// PingOne auth base url
const authBasePath = process.env.PINGONE_AUTH_BASE_URL;
// PingOne environment ID
const envID = process.env.PINGONE_ENV_ID;
// PingOne client ID of the app connection
const clientID = process.env.PINGONE_CLIENT_ID;
// PingOne client secret of the app connection
const clientSecret = process.env.PINGONE_CLIENT_SECRET;
// Express app base url
const appBasePath = process.env.APP_BASE_URL;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
