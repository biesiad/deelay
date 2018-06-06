const express = require("express");
const url = require("url");

const app = express();

app.get("/:delay(\\d+)/:url(*)", function(req, res) {
  const delay = req.params.delay;
  const query = url.parse(req.url).query;
  let redirectUrl = req.params.url;

  if (!redirectUrl.match(/^http:|https:/))
    redirectUrl = `https://${redirectUrl}`;
  if (query) redirectUrl = `${redirectUrl}?${query}`;

  process.stdout.write(`${delay}... `);
  setTimeout(function() {
    process.stdout.write(`${redirectUrl}\n`);
    res.redirect(redirectUrl);
  }, delay);
});

module.exports = app;
