#! /usr/bin/env node

const app = require('../index.js');
const port = process.env.PORT || 4567;

console.log(`Starting delay on port ${port}`);

app.listen(4567);
