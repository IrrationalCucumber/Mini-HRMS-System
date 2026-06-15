const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Attendance = sequelize.define(
  "attendance",
  {
    attendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    attendanceEmpID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time_in: DataTypes.TIME,
    time_out: DataTypes.TIME,
    status: DataTypes.STRING,
  },
  { tableName: "attendance", timestamps: false, freezeTableName: true },
);
