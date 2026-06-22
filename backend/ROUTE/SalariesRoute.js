const express = require("express");
const salariesController = require("../CONTROLLER/SalariesController");
const router = express.Router();

router.get("/all", salariesController.getAllSalaries);
router.get("/employee", salariesController.getEmpSalary);
router.post("/add", salariesController.addEmpSalary);
router.put("/update/:id", salariesController.updateEmployeeSalary);

module.exports = router;
