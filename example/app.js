const Express = require('express');
const http = require('http');
const harakiri = require('../');
const app = new Express();
const server = new http.Server(app);
const port = 3000;
app.use(harakiri(1000, {port}));
app.get('/', (req, res) => res.send('Hello!!'));
app.get('/loop', (req, res) => {
  while(true);
});

server.listen(port, (err) => {
  if(err) {
    console.log(err);
  } else {
    harakiri.observe();
    console.log(`Listing on port ${port}`);
  }
});
