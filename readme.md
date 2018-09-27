harakiri
========================
Express middleware to stop node process on getting into the endless loop or long-blocking execution.

Problem
-----------
Imagine that in some part of your api you have code which <a href="https://nodejs.org/en/docs/guides/dont-block-the-event-loop/">blocks your node's event loop</a>. It will block all other coming requests.
For the sake of simlisity, imagine that somebody from your team created code like `while(true);` which would execute on some specific case.
At this situation you may want to stop processing problematic request. Sadly, but you can't just stop it usually. You would need to restart your server.


How it works
-----------
Harakiri creates child process which observing the http server under the randomly generated system request. If it doesn't receive proper response in the required amount of time - harakiri process will be initiated.


Installation and integration
-----------
```
npm i --save harakiri
````

```
const harakiri = require('harakiri');
...
app.use(harakiri(timeout, {port}));
```

API
-----------
`harakiri(timeout, {port, hostname, protocol}): child_process`
Initiate the middleware.

`harakiri.observe(): child_process`
Start observationg process.

`harakiri.dismiss()`
Kill child process and stop observation.

Licence
-----------
harakiri is [MIT licensed](./LICENSE).
