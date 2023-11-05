const userDB = {
    users: require('../data/users.json'),
    setUsers : function(data){
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) =>{
    const {usr, pwd} = req.body;
    if(!usr || !pwd){
        return res.status(400).json({'message': 'username or password missing'});// bad request status code
    }
    // check if the user already exists
    const duplicateUser = userDB.users.find(person => person.username === usr);
    if(duplicateUser){
        return res.status(409).json({'message': 'username already exists'});// conflict status code
    }
    try{
        // encrpt the password
        const hashedPwd = await bcrypt.hash(pwd, 10); // 10 is the salt rounds which is the number of times the password is hashed
        // store the username and password in the database
        const newUser = {
            "username": usr,
            "password": hashedPwd
        }
        userDB.setUsers([...userDB.users, newUser]);

        // write the new user to the json file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(userDB.users, null, 2) // null and 2 are for formatting the json file where null is helping to remove the white spaces and 2 is for indentation
        );
        console.log(userDB.users);

        res.status(201).json({'message': `user created successfully ${usr}`});// created status code
    }catch(err){
        res.status(500).json({'message': `Internal server error: ${err.message}`});
    }
}

module.exports = {
    handleNewUser
    
}