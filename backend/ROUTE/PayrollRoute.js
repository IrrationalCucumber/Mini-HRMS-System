const express = require("express");
const payrollController = require("../CONTROLLER/PayrollController");
const router = express.Router();

router.get("/all", payrollController.getAllPayroll);
router.get("/employee", payrollController.getEmpPayroll);
router.post("/add", payrollController.addEmpPayroll);
router.put("/update", payrollController.updateEmpPayroll);

module.exports = router;
