#! /usr/bin/env node

const server = require('../index.js');
const port = process.env.PORT || 4567;

server.listen(4567, () => console.log(`Starting delay on port ${port}`));
