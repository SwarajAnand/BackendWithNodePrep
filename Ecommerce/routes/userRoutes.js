const express = require("express");
const userRoutes = express.Router();
const { signup, login } = require("../controllers/userController.js");

userRoutes.post("/signup", signup);

userRoutes.post("/login", login);

module.exports = userRoutes;
