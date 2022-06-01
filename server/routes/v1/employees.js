const express = require("express");
const employees = require("../../controllers/employees");

const router = express.Router();

//localhost:4100/v1/employees/getallemployees
router.post("/login",employees.login)
router.get("/getallemployees", employees.getAllEmployees);
router.get("/getemployee/:id", employees.getEmployeeById);

router.post("/addemployee", employees.addEmployee);

router.put("/updateemployee/:id", employees.updateEmployee);

router.get("/getEmployeeById/:id",employees.getEmployeeById);
router.put("/updatePassword/:id",employees.updatePassword);

router.delete("/deleteemployee/:id", employees.deleteEmployee);



module.exports = router;
