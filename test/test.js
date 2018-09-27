const assert = require('assert');
const http = require('http');
const { fork } = require('child_process');
const port = 3005;
const timeout = 1000;

describe('server', function() {
  let app;
  before(function(done) {
    app = fork(__dirname + '/server.js');
    app.send({timeout, port});
    app.on('message', (status) => done());
  });

  it('should return 200 on get /', function(done) {
    http.get(`http://localhost:${port}`, function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should harakiri server on get /loop', function(done) {
    http.get(`http://localhost:${port}/loop`).on('error', () => done());
  });

  after(function() {
    app.kill();
  });
});