const Emp = require("../MODEL/Employees");

const empController = {
  //get all employee
  getAll: async (_, res) => {
    try {
      const emps = await Emp.findAll();
      if (!emps) return res.status(400).json({ error: "No Employee" }); // return error if no employees
      res.json(emps);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //get employee by id
  getEmpById: async (req, res) => {
    try {
      const id = req.params.id;
      const emp = await Emp.findByPk(id); //find through emp id
      if (!emp) return res.status(400).json({ error: "No Employee found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //add new employee
  addNewEmployee: async (req, res) => {
    try {
      const emp = await Emp.create(req.body); //add emp from front's data
      res.status(200).json(emp);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //update employee details
  updateEmployeeInfo: async (req, res) => {
    try {
      const emp = await Emp.findByPk(req.params.id);
      if (!emp) return res.status(404).json({ error: "Emplyee not found" });
      await emp.update(req.body);
      res.json(emp);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  //delete employee record by id
  deleteEmployeeInfo: async (req, res) => {
    try {
      const emp = await Emp.findByPk(req.params.id);
      if (!emp) return res.status(404).json({ error: "Employee not found" });
      await emp.destroy();
      res.json({ message: "Employee info deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = empController;
