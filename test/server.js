const Express = require('express');
const http = require('http');
const harakiri = require('../');
const app = new Express();
const server = new http.Server(app);

process.on('message', function({timeout, port}) {
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/loop', (req, res) => {
    while(true);
  });
  server.listen(port, (err) => {
    process.send('started');
    if(err) {
      console.error(err)
    } else {
      harakiri(1000);
      console.log(`Listening on port ${port}`);
    }
  });
});

