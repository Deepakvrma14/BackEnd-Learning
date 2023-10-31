const { format } = require('date-fns');

const now = new Date();
const formatted = format(now, 'yyyy-MM-dd');

console.log(formatted);
console.log('last line of code');