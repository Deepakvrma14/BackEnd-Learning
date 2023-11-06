const userDB = {
    users: require('../data/users.json'),
    setUsers : function(data){
        this.users = data;
    }
}
const bcrypt =  require('bcrypt');

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
        return res.json({'message': `user ${usr} logged in successfully`});
    }else{
        return res.status(401).json({'message': 'username or password is incorrect'});//unauthorized status code
    }
}

module.exports = {handleLogin};