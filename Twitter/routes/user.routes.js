const userRoutes = require("express").Router();
const { createpost, getPosts, getAllPost, removePost } = require("../controllers/postController.js");
const { signup, login, logout, updateUser} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/AuthMiddleware.js");

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.post("/update", authMiddleware, updateUser);
userRoutes.post("/logout", authMiddleware, logout);

userRoutes.post("/createpost", authMiddleware, createpost);
userRoutes.get("/profilePosts", authMiddleware, getPosts);
userRoutes.get("/allPosts", getAllPost);
userRoutes.post("/removePost", authMiddleware, removePost);

module.exports = userRoutes;

// signup 
    // {
    //   "userName": "John Doe",
    //   "email": "john.doe@example.com",
    //   "password": "12345678"
    // },
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

  



// Create post 
// {
//     "title": "Second Post",
//     "description": "This is the description for the second post.",
//     "image": "https://example.com/image2.jpg",
//     "user": "60d0fe4f5311236168a109cb"
//   }

//   {
//     "title": "Third Post",
//     "description": "This is the description for the third post.",
//     "image": "https://example.com/image3.jpg",
//     "user": "60d0fe4f5311236168a109cc"
//   }