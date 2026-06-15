const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Emp = sequelize.define(
  "employees",
  {
    employeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    Position: DataTypes.STRING,
    Department: DataTypes.STRING,
    Date_Hired: DataTypes.DATE,
    EmploymentStatus: DataTypes.STRING,
  },
  { tableName: "employees", timestamps: false, freezeTableName: true },
);

module.exports = Emp;
