const assert = require('assert');
const http = require('http');
const deelay = require('../index.js');

const test = async (message, options, callback) => {
  const server = http.createServer(deelay).listen(1234);
  return new Promise(resolve => {
    http.get(
      {
        host: 'localhost',
        port: 1234,
        ...options,
      },
      response => {
        response.on('data', () => null);
        response.on('end', () => {
          callback(response);
          server.close();
          resolve();
        });
      },
    );
  });
};

(async () => {
  await test('redirects to url with http://', { path: '/10/http://testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com');
  });

  await test('add https to url without protocol', { path: '/10/testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test('redirects to url with https://', { path: '/10/https://testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test('redirects to url with path', { path: '/10/http://testurl.com/path' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com/path');
  });

  await test('redirects to url with query string', { path: '/10/http://testurl.com?key=value' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com?key=value');
  });

  await test('redirects to url with hostname:port', { path: '/10/http://testurl.com:1234' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com:1234');
  });

  await test('returns 404 when delay param missing', { path: '/http://testurl.com' }, response => {
    assert.equal(response.statusCode, 404, 'This sucks');
  });

  await test('responds with 404 when delay param malformed', { path: '/1000%20/http://testurl.com' }, response => {
    assert.equal(response.statusCode, 404);
  });

  await test('returns 404 when url missing', { path: '/10' }, response => {
    assert.equal(response.statusCode, 404);
  });

  await test('returns 404 on / call', { path: '' }, response => {
    assert.equal(response.statusCode, 404);
  });

  await test('responds with CORS headers for GET requests', { path: '/10/http://testurl.com' }, response => {
      assert.equal(response.headers['access-control-allow-origin'], '*');
    });

  await test('responds and forwards CORS headers for OPTIONS requests',
    {
      path: '/10/http://testurl.com',
      method: 'options',
      headers: {
        'Access-Control-Request-Methods': 'GET',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    },
    response => {
      assert.equal(
        response.headers['access-control-allow-headers'],
        'Content-Type',
      );
      assert.equal(response.headers['access-control-allow-methods'], 'GET');
    },
  );
})();
