const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Emp = require("./Employees");

const Payroll = sequelize.define(
  "payroll",
  {
    payrollID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    allowance: DataTypes.INTEGER,
    deductions: DataTypes.INTEGER,
    net_salary: DataTypes.INTEGER,
    payrolldate: DataTypes.DATE,
    payroll_empID: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "employeeID",
      },
    },
  },
  { tableName: "salaries", timestamps: false, freezeTableName: true },
);

Payroll.belongsTo(Emp, {
  foreignKey: "payroll_empID",
  targetKey: "employeeID",
});
Emp.hasMany(Payroll, {
  foreignKey: "payroll_empID",
  sourceKey: "employeeID",
});

module.exports = Payroll;
