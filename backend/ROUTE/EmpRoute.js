const express = require("express");
const router = express.Router();
const empController = require("../CONTROLLER/EmpController");

router.get("/all", empController.getAll);
router.get("/employee/:id", empController.getEmpById);
router.post("/add", empController.addNewEmployee);
router.put("/update/:id", empController.updateEmployeeInfo);
router.delete("/delete/:id", empController.deleteEmployeeInfo);

module.exports = router;
