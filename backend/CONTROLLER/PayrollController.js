const Payroll = require("../MODEL/Payroll");
const Employee = require("../MODEL/Employees");

const payrollController = {
  //add employee payroll
  addEmpPayroll: async (req, res) => {
    try {
      const pay = await Payroll.create(req.body);
      res.json(pay);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get all payroll
  getAllPayroll: async (req, res) => {
    try {
      const pay = await Payroll.findAll();
      res.json(pay);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //find payroll of employee
  getEmpPayroll: async (req, res) => {
    try {
      const pay = await Payroll.findOne({
        where: { payroll_empID: req.params.id },
        include: [{ model: Employee }],
      });
      if (!pay) return res.status(404).json({ error: "Payroll Not found" });
      res.json(pay);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //update payroll of employee
  updateEmpPayroll: async (req, res) => {
    try {
      const pay = await Payroll.findByPk(req.params.id);
      if (!pay) return res.status(404).json({ error: "Data not found" });
      res.json(pay);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //generate payroll
  generatePayroll: async (req, res) => {
    try {
      await Payroll.bulkCreate(req.body, {
        ignoreDuplicates: true,
      });

      res.status(200).json({
        message: "Payroll generated successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
};

module.exports = payrollController;
