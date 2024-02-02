const logEvents = require('./logEvents');

const eventEmitter = require('events');
class MyEmitter extends eventEmitter {};
const {v4:uuid}  = require('uuid');

const myEmitter = new MyEmitter();

myEmitter.on('Log', (msg) => logEvents(msg));

console.log(uuid());
setTimeout(() => {
    console.log('Event Logged');
    myEmitter.emit('Log', 'This is a message of emitted event ');
    
}, 2000);
