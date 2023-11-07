const userDB = {
    users: require('../data/users.json'),
    setUsers : function(data){
        this.users = data;
    }
}
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) =>{
    const {usr, pwd} = req.body;
    if(!usr || !pwd){
        return res.status(400).json({'message': 'username or password missing'});// bad request status code
    }
    const foundUser = userDB.users.find(person => person.username === usr);
    if(!foundUser){
        return res.sendStatus(401); //unauthorized status code

    }
    // evaluate the auth
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        // creating the jwt token
        const accessToken = jwt.sign({"username": foundUser.username},
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:'30s'}
         );
          
         const refreshToken = jwt.sign({
         "username": foundUser.username},  // payload 
         process.env.REFRESH_TOKEN_SECRET, // secret key
         {expiresIn:'1d'} // options
         );
        
        // save the refresh token in the database with current user 
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser  = {...foundUser, refreshToken };
        userDB.setUsers([...otherUsers, currentUser]);

        // write the new user to the json file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(userDB.users, null, 2) 
        )
        // store the refresh token in the cookie (if sent as http only cookie then it cannot be accessed by the client side js ams thus more secure)
        res.cookie('jwt','refreshToken',{httpOnly: true , maxAge: 24*60*60*1000});
        
        res.json({ accessToken}); // send the access token to the client
    }else{
         res.status(401).json({'message': 'username or password is incorrect'});//unauthorized status code
    }
}

module.exports = {handleLogin};