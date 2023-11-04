const fs = require('fs');
const path = require('path');

// fs.readFile('./files/start.txt','utf-8', (err, data)=>{
    fs.readFile(path.join(__dirname,'files','start.txt'),'utf-8', (err, data)=>{
    if(err) throw err;

    // console.log(data.toString())
    console.log(data)
})
console.log('last line of code');







fs.writeFile(path.join(__dirname, 'files', 'ans.txt'), 'demo content abc',(err)=>{
    if(err) throw err;
    console.log('write done');
})

process.on('uncaughtException', err => {
    console.error('uncaught error', err);
    process.exit(1);
    
})