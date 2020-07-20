module.exports = (request, response, stdout) => {
  const path = request.url.split('/');
  const delay = path[1];
  let redirectUrl = path.slice(2).join('/');

  if (request.method === 'GET' && !isNaN(delay) && path.length > 2) {
    if (!redirectUrl.match(/^(http|https):/)) {
      redirectUrl = `https://${redirectUrl}`;
    }
    stdout && stdout.write(`${delay}... `);

    setTimeout(() => {
      stdout && stdout.write(`${redirectUrl}\n`);
      response.statusCode = 302;
      response.setHeader('Location', redirectUrl);
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.end();
    }, delay);
  } else if (request.method === 'OPTIONS') {
    response.statusCode = 200;
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', request.headers['access-control-request-headers'] || '');
    response.setHeader('Access-Control-Allow-Methods', request.headers['access-control-request-methods'] || '');
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
};
