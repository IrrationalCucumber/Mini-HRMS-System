const Salary = require("../MODEL/Salaries");
const Employee = require("../MODEL/Employees");

const salariesController = {
  //add employee salary
  addEmpSalary: async (req, res) => {
    try {
      const sal = await Salary.create(req.body);
      res.status(200).json(sal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get all salaries
  getAllSalaries: async (req, res) => {
    try {
      const sal = await Salary.findAll({ include: [{ model: Employee }] });
      res.json(sal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //find salary of employee
  getEmpSalary: async (req, res) => {
    try {
      const sal = await Salary.findOne({
        where: { sm_empID: req.params.id },
        include: [{ model: Employee }],
      });
      if (!sal) return res.status(404).json({ error: "Salary Not found" });
      res.json(sal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //update salary of employee
  updateEmployeeSalary: async (req, res) => {
    try {
      const sal = await Salary.findByPk(req.params.id);
      if (!sal) return res.status(404).json({ error: "Data not found" });
      await sal.update(req.body);
      res.json(sal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = salariesController;
