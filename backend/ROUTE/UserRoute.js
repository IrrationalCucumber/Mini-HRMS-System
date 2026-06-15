const express = require("express");
const router = express.Router();
const UserController = require("../CONTROLLER/UserController");

router.post("/login", UserController.loginUser);

module.exports = router;
