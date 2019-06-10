harakiri
========================
Node.js execution manager which stops process on getting into the endless loop or long-blocking execution.

Problem
-----------
Imagine that in some part of your api you have code which <a href="https://nodejs.org/en/docs/guides/dont-block-the-event-loop/">blocks your node's event loop</a>. It will block all other coming requests.
For the sake of simplicity, imagine that somebody from your team created code like `while(true);` which would execute on some specific case.
At this situation you may want to stop processing problematic request. Sadly, but you can't just stop it usually. You would need to restart your server.

```
const Express = require('express');
const http = require('http');
const app = new Express();
const server = new http.Server(app);
const port = 3000;
app.get('/', (req, res) => res.send('Hello!!'));
app.get('/loop', (req, res) => {
  while(true);
});

server.listen(port, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`Listing on port ${port}`);
  }
});
```
For example, if you would open `/loop` route in your browser then no other user would be able to access the page. But if you would add harakiri, just one line `require('harakiri')(2000);` then in the same situation server would be stopped after 2 seconds of execution after user would open `/loop` page. Your process manager like <a href="http://pm2.keymetrics.io/">pm2</a> or <a href="https://github.com/foreverjs/forever">forever</a> would do the rest to go back to the normal flow.


How it works
-----------
Harakiri creates child process which observing with ping operations the parent process. If it doesn't receive proper response in the required amount of time - parent and child would be killed.


Installation and integration
-----------
```
npm i --save harakiri
````

```
const harakiri = require('harakiri');
harakiri.observe();
```

To stop observing.
```
harakiri.stop();
```

API
-----------
Harakiri module is a singleton. When you import (require) it you get a harakiri function. Function has `stop` and `observe` properties.
`harakiri.observe` function is the same thing that `harakiri`.

`harakiri(timeout): child_process`
Initiate an observation. Default timeout is 5000ms.

`harakiri.observe(): child_process`
Initiate an observation. Default timeout is 5000ms.

`harakiri.stop()`
Kill child process and stop observation.

Licence
-----------
harakiri is [MIT licenсed](./LICENСE).
