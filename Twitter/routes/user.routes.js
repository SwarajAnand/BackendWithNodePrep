const userRoutes = require("express").Router();
const {
  signup,
  login,
  logout,
  updateUser,
  getProfile
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/AuthMiddleware.js");

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/update", authMiddleware, updateUser);
userRoutes.get("/logout", authMiddleware, logout);
userRoutes.get("/getProfile", authMiddleware, getProfile);

module.exports = userRoutes;

// signup
// {
//   "userName": "John Doe",
//   "email": "john.doe@example.com",
//   "password": "12345678"
// }

// {
//   "userName": "Jane Smith",
//   "email": "jane.smith@example.com",
//   "password": "password123"
// },
// {
//   "userName": "Alice Johnson",
//   "email": "alice.johnson@example.com",
//   "password": "qwerty123"
// },

// Curr
// {
//   "userName": "Bob Brown",
//   "email": "bob.brown@example.com",
//   "password": "letmein2024"
// }
