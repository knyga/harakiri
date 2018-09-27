const { fork } = require('child_process');
const crypto = require('crypto');
let forked = null;
let url = null;
let delay = 15000;

function harakiri(delayInput = delay, urlParamsInput) {
  const path = '/' + crypto.randomBytes(20).toString('hex');
  const {port, hostname, protocol} = Object.assign({port: 80, hostname: 'localhost', protocol: 'http'}, urlParamsInput);
  url = `${protocol}://${hostname}:${port}${path}`;
  delay = delayInput;

  return function(req, res, next) {
    if(req.originalUrl === path) {
      res.sendStatus(200);
      return;
    }
    next();
  };
}

harakiri.observe = function() {
  if(forked) {
    forked.kill();
  }

  forked = fork(__dirname + '/fork.js');
  forked.send({pid: process.pid, delay, url});
  return forked;
};

harakiri.dismiss = function() {
  if(forked) {
    forked.kill();
  }
};

process.on('exit', function() {
  if(forked) {
    forked.kill();
  }
});

module.exports = harakiri;