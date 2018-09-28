// Automatically invoking observation
// Same thing could be achieved with
// const observe = require('harakiri');
// observe();
// or you could provide the timeout needed (default if 5000 ms)
// observe(10000);
// Or import with destruction
// const { observe, stop } = require('harakiri')
// stop could be used to stop observation, for example if you want to have blocking operation intentionally
// Same thing could be even achieved with observe.stop()
// Do what you want - it is hard to do a mistake here
require('../../')();

setTimeout(() => {while(true);}, 5000);
setInterval(() => console.log(new Date()), 1000);