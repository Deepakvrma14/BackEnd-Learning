const whiteList = [
    'http://localhost:3500', 
    'http://localhost:5500', 
    'http://localhost:4500', 
    'http://localhost:6500'
];

const corsOptions = {
    origin : (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin ){
            callback(null, true); // no error and allot it

        }
        else{
            callback(new Error('not allowed by cors'));

        }
        optionSuccessStatus : 200;

    }
}
module.exports = corsOptions;