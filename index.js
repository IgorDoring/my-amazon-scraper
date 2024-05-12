var scrape = require("./js/script.js");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", {
    root: __dirname,
  });
});

app.get("/api/scrape", async (req, res) => {
  let keyword = req.query.keyword;
  scrape.scrapeSearchPage("creatine").then((products) => {
    res.json(products);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
