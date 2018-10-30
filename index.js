const http = require('http');

const server = http.createServer((request, response) => {
  const path = request.url.split('/');

  if (request.method === 'GET' && path.length >= 3) {
    const delay = path[1];
    let redirectUrl = path.slice(2).join('/');

    if (!redirectUrl.match(/^http:|https:/))
      redirectUrl = `https://${redirectUrl}`;

    setTimeout(() => {
      response.statusCode = 302;
      response.setHeader('Location', redirectUrl);
      response.end();
    }, delay);
  } else {
    response.statusCode = 404;
    response.end();
  }
});

module.exports = server;
