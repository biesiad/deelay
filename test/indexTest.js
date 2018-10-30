const app = require("../index.js");
const nock = require("nock");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("deelay", function() {
  it("redirects to url", function(done) {
    nock("http://testurl.com")
      .get("/")
      .reply(200, "Success");

    chai
      .request(app)
      .get("/10/http://testurl.com")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("http://testurl.com/");
        done();
      });
  });

  it("redirects if protocol empty", function(done) {
    nock("https://testurl.com")
      .get("/")
      .reply(200, "Success");

    chai
      .request(app)
      .get("/10/testurl.com")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("https://testurl.com/");
        done();
      });
  });

  it("redirects with https", function(done) {
    nock("https://testurl.com")
      .get("/")
      .reply(200, "Success");
    chai
      .request(app)
      .get("/10/testurl.com")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("https://testurl.com/");
        done();
      });
  });

  it("redirects with path", function(done) {
    nock("http://testurl.com")
      .get("/path")
      .reply(200, "Success");

    chai
      .request(app)
      .get("/10/http://testurl.com/path")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("http://testurl.com/path");
        done();
      });
  });

  it("redirects with query", function(done) {
    nock("http://testurl.com")
      .get("/")
      .query({ key: "value" })
      .reply(200, "Success");

    chai
      .request(app)
      .get("/10/http://testurl.com?key=value")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("http://testurl.com/?key=value");
        done();
      });
  });

  it("redirects with port", function(done) {
    nock("http://testurl.com:1234")
      .get("/")
      .reply(200, "Success");

    chai
      .request(app)
      .get("/10/http://testurl.com:1234")
      .end(function(err, res) {
        expect(res.text).to.equal("Success");
        expect(res).to.redirectTo("http://testurl.com:1234/");
        done();
      });
  });

  it("returns 404 if delay empty", function(done) {
    chai
      .request(app)
      .get("/testurl.com")
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it("returns 404 if url empty", function(done) {
    chai
      .request(app)
      .get("/testurl.com")
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
