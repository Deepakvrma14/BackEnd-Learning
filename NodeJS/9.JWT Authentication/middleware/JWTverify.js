const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.sendStatus(401);
    }
    console.log(authHeader); // Bearer <token> means that the token is sent in the header with the bearer keyword
    const token = authHeader.split(' ')[1];
    const verify  = jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                return res.sendStatus(403); // forbidden/ invalid token
            }
            req.usr = decoded.username;
            next();
        }
    
        );
}
module.exports = verifyJWT;