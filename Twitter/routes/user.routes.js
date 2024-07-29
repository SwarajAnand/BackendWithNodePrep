const userRoutes = require("express").Router();
const { signup, login, logout, updateUser} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/AuthMiddleware.js");

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/update", authMiddleware, updateUser);
userRoutes.post("/logout", authMiddleware, logout);

module.exports = userRoutes;
