const http = require('http');

process.on('message', function({pid, delay, url}) {
  function kill(message) {
    console.error(message);
    process.kill(pid);
    process.exit(0);
  }

  function execute() {
    const timeout = setTimeout(function() {
      kill('timeout');
    }, delay);
    http.get(url, function (res) {
      clearTimeout(timeout);
      if(res.statusCode !== 200) {
        kill('no success');
      } else {
        res.on('error', (e) => kill(e));
      }
    });
  }

  setInterval(execute, delay);
  execute();
});