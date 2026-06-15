const mySql = require("mysql");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// const db = mySql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASS,
//   database: process.env.DATABASE,
// });

//initialize db with sequelize
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false,
  },
);
//test connection to db
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
