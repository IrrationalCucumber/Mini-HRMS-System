const express = require("express");
const router = express.Router();
const attController = require("../CONTROLLER/AttendController");

router.post("/add", attController.addAttend);
router.get("/all", attController.getAll);
router.get("/attendance", attController.getEmpAttend);

module.exports = router;
