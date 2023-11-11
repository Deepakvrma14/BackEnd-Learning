const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const role_list = require('../../config/role_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(role_list.Admin, role_list.Editor),employeesController.createNewEmployee)
    .put(verifyRoles(role_list.Admin, role_list.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(role_list.Admin),employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;