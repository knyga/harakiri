const Express = require('express');
const http = require('http');
const harakiri = require('../../');
const app = new Express();
const server = new http.Server(app);
const port = 3000;
app.get('/', (req, res) => res.send('Hello!!'));
// Open http://localhost:3000/loop in the browser to executing blocking operation
app.get('/loop', (req, res) => {
  while(true);
});

server.listen(port, (err) => {
  if(err) {
    console.log(err);
  } else {
    // Better to start observation after server started
    // Just to prevent some locking operations you might have during booting the project
    harakiri();
    console.log(`Listing on port ${port}`);
  }
});
