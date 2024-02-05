const { format } = require('date-fns');

const { v4:uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const date = `${format(new Date(), 'yyyy-MM-dd')}`;
    const time = `${format(new Date(), 'HH:mm:ss')}`;
    const log = `${date}\t ${time}\t ${uuid()}\t ${message}\n`;

    
    try{
        if(!fs.existsSync(path.join(__dirname,'..' , 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // test
        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName), log);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t ${req.header.origin}\t ${req.url}\t ${req.path}`, 'request.txt');
    logEvents(``)
    console.log(`${req.method}  ${req.path}`);
    next();
}


module.exports = {logger, logEvents};
// const now = new Date();
// const formatted = format(now, 'yyyy-MM-dd');

// console.log(formatted);
// console.log('last line of code');
// // console.log(uuid());