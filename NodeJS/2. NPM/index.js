const logEvents = require('./logEvents');

const eventEmitter = require('events');
class MyEmitter extends eventEmitter {};
const {v4:uuid}  = require('uuid');

const myEmitter = new MyEmitter();

myEmitter.on('Log', (msg) => logEvents(msg));

console.log(uuid());0
setTimeout(() => {
    myEmitter.emit('Log', 'This is a message of emitted event ');
    
}, 2000);
