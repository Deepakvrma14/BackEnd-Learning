const express  = require('express');

const app = express();
const path  = require('path');

const PORT = process.env.PORT || 3500;

app.get(['/', '/index(.html)?'], (req, res) => { // ^/|index(.html)? means that the url can be / or /index.html or /index
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


app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); 
});




app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



