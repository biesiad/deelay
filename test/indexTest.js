const assert = require('assert');
const http = require('http');
const server = require('../index.js');

const test = async (url, callback) => {
  server.listen(1234);

  return new Promise((resolve) => {
    http.get(`http://localhost:1234${url}`, response => {
      response.on('data', () => null);
      response.on('end', () => {
        callback(response);
        server.close();
        resolve();
      });
    });
  });
};

(async () => {
  await test('/10/http://testurl.com', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com');
  });

  await test('/10/testurl.com', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test('/10/testurl.com', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test('/10/https://testurl.com', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'https://testurl.com');
  });

  await test('/10/http://testurl.com/path', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com/path');
  });

  await test('/10/http://testurl.com?key=value', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com?key=value');
  });

  await test('/10/http://testurl.com:1234', response => {
    assert.equal(response.statusCode, 302);
    assert.equal(response.headers['location'], 'http://testurl.com:1234');
  });

  await test('/http://testurl.com', response => {
    assert.equal(response.statusCode, 404, 'This sucks');
  });

  await test('/10', response => {
    assert.equal(response.statusCode, 404);
  });

  await test('', response => {
    assert.equal(response.statusCode, 404);
  });

  await test('/10/http://testurl.com', response => {
    assert.equal(response.headers['access-control-allow-origin'], '*');
  });
})();
