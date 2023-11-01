const logEvents = require('./logEvents');

const eventEmitter = require('events');
class MyEmitter extends eventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('Log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('Log', 'This is a message of emitted event ');
    
}, 2000);
