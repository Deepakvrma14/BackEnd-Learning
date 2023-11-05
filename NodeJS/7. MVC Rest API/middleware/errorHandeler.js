// const {logEvents} = require('./logEvents');

// const errorHandeler = app.use( (err, req, res, next) => {
//     logEvents(`${err.name}:${err.message}`, 'errLog.txt');

//     console.error(err.stack);
//     res.status(500).send(err.message);

// });

// module.exports = errorHandeler;
const logEvents = require('./logEvents');

const errorHandeler = (err, req, res, next) => {
    logEvents(`${err.name}:${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandeler;