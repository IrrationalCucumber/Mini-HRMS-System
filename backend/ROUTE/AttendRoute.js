const express = require("express");
const router = express.Router();
const attController = require("../CONTROLLER/AttendController");

router.post("/add", attController.addAttend);
router.get("/all", attController.getAll);
router.get("/attendance", attController.getEmpAttend);
router.put("/update/:id", attController.updateAttendance);
router.post("/generate-attendance", attController.bulkAddAttend);

module.exports = router;
