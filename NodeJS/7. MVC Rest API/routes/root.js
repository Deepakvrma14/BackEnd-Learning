const express = require('express');
const router = express.Router();
const path = require('path');


router.get(('^/$|index(.html)?'), (req, res) => { // ^/|index(.html)? means that the url can be / or /index.html or /index
    // res.send('Hello World');
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html')); 
});


module.exports = router;