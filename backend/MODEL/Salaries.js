const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Emp = require("./Employees");

const Salary = sequelize.define(
  "salaries",
  {
    smID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    basic_salary: DataTypes.INTEGER,
    allowance: DataTypes.INTEGER,
    deduction: DataTypes.INTEGER,
    net_salary: DataTypes.INTEGER,
    sm_empID: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "employeeID",
      },
    },
  },
  { tableName: "salaries", timestamps: false, freezeTableName: true },
);

Salary.belongsTo(Emp, {
  foreignKey: "sm_empID",
  targetKey: "employeeID",
});
Emp.hasMany(Salary, {
  foreignKey: "sm_empID",
  sourceKey: "employeeID",
});

module.exports = Salary;
