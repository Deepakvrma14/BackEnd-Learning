const express = require('express');
const router = express.Router();
const path =    require('path');
// const employeesControllers = require('../../controllers/employeesControllers');
const { getEmployee, createNewEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../../../7. MVC Rest API/controllers/employeesControllers');
// const verifyJWT = require('../../middleware/JWTverify');

const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    // .get(verifyJWT, getAllEmployees)
    .get(getAllEmployees)

    .post(createNewEmployee)


    .put(updateEmployee)
     
    .delete(deleteEmployee);

router.route('/:id') //get req hvaing a variable as a parimeter of get request
    .get(getEmployee);
module.exports = router;