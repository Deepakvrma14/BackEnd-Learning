console.log('Hello World!')
// console.log(global)
const os = require('os')
const path = require('path')    
// const math = require('./math')
const {add, subtract, multiply, divide} = require('./math')


console.log(subtract(2,1))
console.log(add(2,1))
console.log(multiply(2,5))

// console.log(os.platform())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)


// console.log(path.basename(__filename))
// console.log(path.dirname(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))