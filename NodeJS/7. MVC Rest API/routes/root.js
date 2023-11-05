const express = require('express');
const router = express.Router();
const path = require('path');


router.get(('^/$|index(.html)?'), (req, res) => { // ^/|index(.html)? means that the url can be / or /index.html or /index
    // res.send('Hello World');
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html')); 
});
router.get('/new-page(.html)?', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, '..','views', 'new-page.html')); 
});
router.get('/old-page(.html)?', (req, res) => {
    // res.send('Hello World');
    res.redirect(301,'..', 'new-page.html'); 

});

module.exports = router;