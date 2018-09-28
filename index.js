const { fork } = require('child_process');

let harakiriIntervalId = -1;
let forked = null;
const createAction = (type, payload) => ({ type, payload });
const killFork = () => {
  if(forked) {
    forked.kill()
  }
};
const stop = () => {
  killFork();
  clearInterval(harakiriIntervalId);
};
const observe = (timeout = 5000) => {
  stop();
  forked = fork(__dirname + '/fork.js');
  const ping = () => forked.send(createAction('ping'));
  forked.send(createAction('start', { pid: process.pid, timeout }));
  harakiriIntervalId = setInterval(ping, timeout/2);
  ping();
  process.on('exit', killFork);
};
observe.stop = stop;
observe.observe = observe;

module.exports = observe;