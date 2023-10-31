const { format } = require('date-fns');
// const { v4:uuid } = require('uuid');
const { v4:uuid } = require('uuid');

console.log('first line of code');

const now = new Date();
const formatted = format(now, 'yyyy-MM-dd');

console.log(formatted);
console.log('last line of code');
console.log(uuid());