const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const User = sequelize.define(
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

module.exports = User;
