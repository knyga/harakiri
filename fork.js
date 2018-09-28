let pid = -1;
let timeout = -1;
let countDownId = -1;
const harakiriCountDown = () => {
  countDownId = setTimeout(() => {
    process.kill(pid);
    process.exit(0);
  }, timeout);
  return countDownId;
};
const stopHarakiri = () => {
  return clearTimeout(countDownId);
};
process.on('message', ({ type, payload }) => {
  switch(type) {
    case 'start':
      pid = payload.pid;
      timeout = payload.timeout;
      harakiriCountDown();
      break;
    case 'ping':
      stopHarakiri();
      harakiriCountDown();
      break;
  }
});