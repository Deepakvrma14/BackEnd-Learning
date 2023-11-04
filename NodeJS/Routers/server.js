const express  = require('express');

const app = express();
const path  = require('path');

const {logger} = require('./middleware/logEvents');
const errorHandeler = require('./middleware/errorHandeler');

const PORT = process.env.PORT || 3500;
const cors = require('cors');

// custom middleware logger
// app.use((req, res, next) => {
//     logEvents(`${req.method}\t ${req.header.origin}\t ${req.url}\t ${req.path}`, 'request.txt');
//     console.log(`${req.method}  ${req.path}`);
//     next();
// });

// defining the above in the log events only to make the ocde more cleaner adn importing on yl logger fucntion
app.use(logger);

// cross origin resource sharing

const whiteList = ['http://localhost:3500', 'http://localhost:5500', 'http://localhost:4500', 'http://localhost:6500'];
app.use(cors());

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
// build in middleware
// handle url; encoded data or forms data 

app.use(express.urlencoded({extended: false}));


app.use(express.json());

app.use(express.static(path.join(__dirname, 'views'))); // static files





app.get(('^/$|index(.html)?'), (req, res) => { // ^/|index(.html)? means that the url can be / or /index.html or /index
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});
app.get('/new-page(.html)?', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, 'views', 'new-page.html')); 
});
app.get('/old-page(.html)?', (req, res) => {
    // res.send('Hello World');
    res.redirect(301, 'new-page.html'); 

});

// route handeler
app.get('/hello(.html)?', (req, res, next) => {
    console.log('hello');
    next();

}, (req, res) => {
    res.send('Hello World');
});

const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) =>{
    res.send('finished');
    console.log('three');
}
app.get('/chain(.html)?', [one, two, three]);

// app.all for routing and accepts regex and app.use for middleware which doesnt accept regex

app.all('*', (req, res) => {
    res.status(404);
    
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts(json)){
        res.json({error: 'not found'});
    }else{
        res.type('txt').send('not found');
    }
    
});

app.use(errorHandeler)




app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



