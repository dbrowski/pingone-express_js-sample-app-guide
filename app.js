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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
