const express = require("express");
const payrollController = require("../CONTROLLER/PayrollController");
const router = express.Router();

router.get("/all", payrollController.getAllPayroll);
router.get("/employee/:id", payrollController.getEmpPayroll);
router.post("/add", payrollController.addEmpPayroll);
router.put("/update/:id", payrollController.updateEmpPayroll);
router.post("/generate", payrollController.generatePayroll);
module.exports = router;
