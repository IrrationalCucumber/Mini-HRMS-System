const Attend = require("../MODEL/Attendance");

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
      const att = await Attend.findAll();
      res.json(att);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get attendce of employee
  getEmpAttend: async (req, res) => {
    try {
      const att = await Attend.findOne({
        where: { attendanceID: req.params.id },
      });
      if (!att) return res.status(404).json({ error: "No data found" });
      res.json(att);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = attController;
