const fs = require('fs');

fs.mkdir('./newDir', (err) => {
    if(err) throw err;
    console.log('new folder created');
});

