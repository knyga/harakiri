harakiri
========================
Node.js execution manager which stops process on getting into the endless loop or long-blocking execution.

Problem
-----------
Imagine that in some part of your api you have code which <a href="https://nodejs.org/en/docs/guides/dont-block-the-event-loop/">blocks your node's event loop</a>. It will block all other coming requests.
For the sake of simplicity, imagine that somebody from your team created code like `while(true);` which would execute on some specific case.
At this situation you may want to stop processing problematic request. Sadly, but you can't just stop it usually. You would need to restart your server.


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

To stop observing
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
harakiri is [MIT licensed](./LICENSE).
