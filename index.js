const http = require('http');

const server = http.createServer((request, response) => {
  const path = request.url.split('/');
  const delay = path[1];
  let redirectUrl = path.slice(2).join('/');

  if (request.method === 'GET' && !isNaN(delay) && path.length > 2) {
    if (!redirectUrl.match(/^(http|https):/)) {
      redirectUrl = `https://${redirectUrl}`;
    }
    process.stdout.write(`${delay}... `);

    setTimeout(() => {
      process.stdout.write(`${redirectUrl}\n`);

      response.statusCode = 302;
      response.setHeader('Location', redirectUrl);
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.end();
    }, delay);
  } else {
    response.statusCode = 404;
    response.end();
  }
});

module.exports = server;
