const Attend = require("../MODEL/Attendance");
const Employee = require("../MODEL/Employees");

const attController = {
  addAttend: async (req, res) => {
    try {
      const att = await Attend.create(req.body);
      res.status(200).json(att);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get all attendance
  getAll: async (req, res) => {
    try {
      const att = await Attend.findAll({ include: [{ model: Employee }] });
      res.json(att);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get attendce of employee
  getEmpAttend: async (req, res) => {
    try {
      const att = await Attend.findOne({
        where: { attendanceEmpID: req.params.id },
        include: [{ model: Employee }],
      });
      if (!att) return res.status(404).json({ error: "No data found" });
      res.json(att);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = attController;
