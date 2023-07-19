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
const authBaseURL = process.env.PINGONE_AUTH_BASE_URL;
// PingOne environment ID
const envID = process.env.PINGONE_ENV_ID;
// PingOne client ID of the app connection
const clientID = process.env.PINGONE_CLIENT_ID;
// PingOne client secret of the app connection
const clientSecret = process.env.PINGONE_CLIENT_SECRET;
// Express app base url
const appBaseURL = process.env.APP_BASE_URL;

/**
 * Some constants we'll need for an OAuth/OIDC Authorization Code flow.
 */
// PingOne authorize endpoint
const authorizeEndpoint = "/as/authorize";
// PingOne token endpoint
const tokenEndpoint = "/as/token";
// The url path made available for when the user is redirected back from the
// authorization server, PingOne.
const callbackPath = "/callback";
// The full url where the user is redirected after authenticating/authorizing
// with PingOne.
const redirectURI = appBaseURL + ":" + port + callbackPath;
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
// /authorize endpoint. The Authorization Code flow is recommended as the best
// practice in most cases
// https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-23
const grantType = "authorization_code";
const responseType = "code";

/**
 * Create the authorization request.
 * When someone navigates to the root path,
 * "/", a basic link with the text "Login" is sent to be rendered by the
 * browser.
 * Clicking the link will redirect the user to PingOne with the
 * authorization request parameters.
 * The user is then prompted to authenticate.
 */
app.get("/", (req, res) => {
  // authorize url path
  const authzPath = envID + authorizeEndpoint;
  // authorize request starting with the url origin and path.
  const authzReq = new URL(path, authBaseURL);

  // Add query parameters to define the authorize request
  authzReq.searchParams.append("redirect_uri", redirectURI);
  authzReq.searchParams.append("client_id", clientID);
  authzReq.searchParams.append("scope", scopes);
  authzReq.searchParams.append("response_type", responseType);

  // Send a link to the browser to render with the text "Login".
  // When the link is clicked the user is redirected to the authorization
  // server, PingOne, at the authorize endpoint. The query parameters are read
  // by PingOne and combine to make the authorization request.
  res.status(200).send("<a href=" + authzReq.toString() + ">Login</a>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
