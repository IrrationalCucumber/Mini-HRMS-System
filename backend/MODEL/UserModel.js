const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const User = sequelize.define(
  "users",
  {
    usersID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { tableName: "users", timestamps: false, freezeTableName: true },
);

module.exports = User;
