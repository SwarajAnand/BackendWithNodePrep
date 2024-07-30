const postModel = require("../model/post.model");
const userModule = require("../model/user.model");
const ApiError = require("../utils/ApiError");

const createpost = async (req, res) => {
  try {
    const post = req.body;
    post.user = req.user.userId;
    post.userAvatar = req.user.avatar;
    post.createBy = req.user.userName;

    console.log(req.user)
    const createUserPost = await postModel.create(post);
  
    const addUserToPost = await userModule.findByIdAndUpdate(req.user.userId, {
      $push: {
        posts: createUserPost._id,
      },
    });
  
    res.json({
      success: true,
      message: "Post added successfully",
    });
  } catch (err) {
    res.json(
      new ApiError(500, err.message || "Something went wrong", [
        "Error creating post",
      ])
    )
  }
};

const getPosts = async (req, res) => {
  try {
    const user = await userModule.findById(req.user.userId).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Current user posts",
      posts: user.posts,
    });

  } catch (error) {
    console.error("Error getting posts:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, err.message || "Something went wrong", [
          "Error getting posts",
        ])
      );
  }
};

const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await postModel.find()
      .sort({ createdAt: -1 })
      .populate('user', 'avatar userName'); 

    res.json({
      success: true,
      message: "All posts",
      posts: posts,
      page: page,
      limit: limit,
    });
  } catch (err) {
    res.status(500).json(
      new ApiError(500, err.message || "Something went wrong", [
        "Error getting posts",
      ])
    );
  }
};

const removePost = async (req, res) => {
  const userPost = await userModule.findByIdAndDelete(req.user.userId , {
    $pull: {
      posts: req.body.post,
    },
  });

  console.log(userPost.posts);

  res.json({
    success: true,
    message: "Post deleted successfully",
  });
};

const postController = {
  createpost,
  removePost,
  getPosts,
  getAllPost
};
module.exports = postController;





