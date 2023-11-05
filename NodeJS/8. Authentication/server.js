const express  = require('express');

const app = express();
const path  = require('path');

const {logger} = require('./middleware/logEvents');
const errorHandeler = require('./middleware/errorHandeler');

const PORT = process.env.PORT || 3500;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// defining the above in the log events only to make the ocde more cleaner adn importing on yl logger fucntion
app.use(logger);

// cross origin resource sharing

app.use(cors(corsOptions));
// build in middleware
// handle url; encoded data or forms data 

app.use(express.urlencoded({extended: false}));

// static files serve
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); 
// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/api/register'));
app.use('/employees', require('./routes/api/employees'));

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



