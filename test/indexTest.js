const assert = require('assert');
const http = require('http');
const deelay = require('../index.js');


const test = async (options, callback) => {
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
  await test({ path: '/10/http://testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com');
  });

  await test({ path: '/10/testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test({ path: '/10/testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test({ path: '/10/https://testurl.com' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test({ path: '/10/http://testurl.com/path' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com/path');
  });

  await test({ path: '/10/http://testurl.com?key=value' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com?key=value');
  });

  await test({ path: '/10/http://testurl.com:1234' }, response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com:1234');
  });

  await test({ path: '/http://testurl.com' }, response => {
    assert.equal(response.statusCode, 404, 'This sucks');
  });

  await test({ path: '/10' }, response => {
    assert.equal(response.statusCode, 404);
  });

  await test({ path: '' }, response => {
    assert.equal(response.statusCode, 404);
  });

  await test({ path: '/10/http://testurl.com' }, response => {
    assert.equal(response.headers['access-control-allow-origin'], '*');
  });

  await test(
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
