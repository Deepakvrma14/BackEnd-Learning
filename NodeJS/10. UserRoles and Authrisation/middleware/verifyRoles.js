const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles) return res.sendStatus(401);
        const roleArray = [...allowedRoles];
        console.log(roleArray);
        console.log(req.roles);

        const found = roleArray.map(role => req.roles.includes(role)).find(val => val === true);
        // returns an array of booleans to check if the role is in the allowedRoles array and then checks if any of the values are true(only one needs to be true to atleast allow to route to be accessed)

        if(!found) return res.sendStatus(403);// Forbidden
        next();

    }
}

module.exports = verifyRoles;