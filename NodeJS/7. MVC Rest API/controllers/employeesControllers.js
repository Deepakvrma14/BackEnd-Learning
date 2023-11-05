const data = {
    employees: require('../data/employees.json'),
    setEmployees: function(data){
        this.employees = data;
    }
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    if(!newEmployee.firstName || !newEmployee.lastName){
        return res.status(404).json({'message': 'please include both first and last name'});
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.newEmployee);
}
const updateEmployee = (req, res) => {
    // some is a method which returns true or false if the condition is true or false for any of the elements in the array
    //  could have used findIndex but it would have been more code
    const found = data.employees.some(employee => employee.id === parseInt(req.body.id));
    if(found){
        const updEmployee = req.body;
        data.employees.forEach(employee => {
            if(employee.id === parseInt(req.body.id)){
                employee.firstName = updEmployee.firstName ? updEmployee.firstName : employee.firstName;
                employee.lastName = updEmployee.lastName ? updEmployee.lastName : employee.lastName;
                res.json({'message': 'Employee updated', employee});
            }
        });
    }
    else{
        res.status(400).json({'message': `Employee with id ${req.body.id} not found`});
    }


}
 const deleteEmployee = (req, res) => {
    const found = data.employees.some(employee => employee.id === parseInt(req.body.id));
    if(found){
        const fileteredEmployees = data.employees.filter(employee => employee.id !== parseInt(req.body.id));
        data.setEmployees(fileteredEmployees);
        res.json({'message': `Employee with id ${req.body.id} deleted`, employees: data.employees});
    }
    else{
        res.status(400).json({'message': `Employee with id ${req.body.id} not found`});
    }
}
const getEmployee = (req, res) => {
    const employee = data.employees.find(employee => employee.id === parseInt(req.params.id));
    if(employee){
        res.json(employee);
    }
    else{
        res.status(400).json({'message': `Employee with id ${req.params.id} not found`});
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}




// old code which cant cange the data in the json file
// const data = {};
// data.employees = require('../../data/employees.json');


// const getAllEmployees = (req, res) => {
//     res.json(data.employees);
// }
// const createNewEmployee = (req, res) => {
//     res.json({
//      "firstName": req.body.firstName,
//       "lastName": req.body.lastName
//     });
// }
// const updateEmployee = (req, res) => {
//     res.json({
//      "firstName": req.body.firstName,
//       "lastName": req.body.lastName
//     });

//  }
//  const deleteEmployee = (req, res) => {
//     res.json({
//         "id": req.body.id,
//     })
// }
// const getEmployee = (req, res) => {
//     res.json({
//         "id": req.params.id,
//     })
// }

// module.exports = {
//     getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getEmployee
// }