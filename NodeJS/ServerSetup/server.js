const http = require('http');
const fs  = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');

const eventEmitter = require('events');
class MyEmitter extends eventEmitter {};

const myEmitter = new MyEmitter();

// myEmitter.on('Log', (msg) => logEvents(msg));


