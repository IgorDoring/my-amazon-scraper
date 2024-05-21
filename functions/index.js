/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
var scrape = require("./scriptAxios.js");
const express = require("express");
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", {
    root: __dirname,
  });
});

app.get("/api/scrape", (req, res) => {
  let keyword = req.query.keyword;
  scrape.scrapeSearchPage(keyword).then((products) => {
    res.send(products);
  });
});

exports.app = onRequest(app);
