#! /usr/bin/env node

const deelay = require('../index.js');
const http = require('http');
const port = process.env.PORT || 4567;

http.createServer(deelay).listen(4567, () => console.log(`Starting delay on port ${port}`));
