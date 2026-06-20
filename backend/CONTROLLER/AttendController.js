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
  //update attendance
  updateAttendance: async (req, res) => {
    try {
      const att = await Attend.findByPk(req.params.id);
      if (!att) return res.status(404).json({ error: "Attendance not found" });
      await att.update(req.body);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //generate attendance to all
  bulkAddAttend: async (req, res) => {
    try {
      const { employees, date } = req.body;
      //get all with date
      const existing = await Attend.findAll({
        where: { date },
      });
      //identify which have date and dont have
      const existingMap = {};
      existing.forEach((a) => {
        existingMap[a.attendanceEmpID] = true;
      });
      //store it
      const newRecords = employees
        .filter((id) => !existingMap[id])
        .map((id) => ({
          attendanceEmpID: id,
          date,
          time_in: null,
          time_out: null,
          status: null,
        }));
      //add to db
      const result = await Attend.bulkCreate(newRecords);

      res.json({
        message: "Attendance generated",
        inserted: result.length,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = attController;
