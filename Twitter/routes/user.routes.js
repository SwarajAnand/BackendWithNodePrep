const userRoutes = require("express").Router();
const upload = require("../middlewares/uploadFile.js");
const {
  signup,
  login,
  logout,
  updateUser,
  getProfile,
  followUser,
  unFollowUser,
  searchUser
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/update", upload.single('avatar'), authMiddleware, updateUser);
userRoutes.get("/logout", authMiddleware, logout);
userRoutes.get("/getProfile", authMiddleware, getProfile);
userRoutes.get("/search", authMiddleware, searchUser);
userRoutes.get("/follow", authMiddleware, followUser);
userRoutes.get("/unFollow", authMiddleware, unFollowUser);



module.exports = userRoutes;

