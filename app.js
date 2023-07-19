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

/**
 * Some constants we'll need for an OAuth/OIDC Authorization Code flow.
 */
// The url path made available for when the user is redirected back from the
// authorization server, PingOne.
const callbackPath = "/callback";
// The full url where the user is redirected after authenticating/authorizing
// with PingOne.
const redirectURI = appBasePath + ":" + port + callbackPath;
// Scopes specify what kind of access the client is requesting from the user.
// These are some standard OIDC scopes.
//   openid - signals an OIDC request; default resource on oauth/oidc app
// connection
// These need to be added as resources to the app connection or it will be
// ignored by the authorization server. Once that's done, you can then append
// it to your scopes variable using a whitespace to separate it from any other
// scopes.
//   profile - access to basic user info;
//   p1:read:user - access to read the user's PingOne identity's attributes (a
// PingOne - specific scope)
const scopes = "openid";
// The OAuth 2.0 grant type and associated type of response expected from the
// /authorize endpoint.
// i.e., code, authorization_code - Authorization Code;
const grantType = "authorization_code";
const responseType = "code";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
