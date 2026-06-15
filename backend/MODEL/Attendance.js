const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Emp = require("./Employees");

const Attendance = sequelize.define(
  "attendance",
  {
    attendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //foreign key
    attendanceEmpID: {
      type: DataTypes.INTEGER,
      references: {
        model: "employees",
        key: "employeeID",
      },
    },
    date: DataTypes.DATE,
    time_in: DataTypes.TIME,
    time_out: DataTypes.TIME,
    status: DataTypes.STRING,
  },
  { tableName: "attendance", timestamps: false, freezeTableName: true },
);

Attendance.belongsTo(Emp, {
  foreignKey: "attendanceEmpID",
  targetKey: "employeeID",
});
Emp.hasMany(Attendance, {
  foreignKey: "attendanceEmpID",
  sourceKey: "employeeID",
});

module.exports = Attendance;
