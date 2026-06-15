const cors = require("cors");
const express = require("express");
const db = require("./dbConfig.js");
require("dotenv").config();
const { Sequelize } = require("sequelize");
//routes
const UserRouter = require("./ROUTE/UserRoute");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.json("Hello, this is the backend server!");
});

app.use("/", UserRouter);
