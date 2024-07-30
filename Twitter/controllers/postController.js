const uploadOnCloudinary = require("../middlewares/cloudinary");
const postModel = require("../model/post.model");
const userModule = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const cloudinary = require('cloudinary').v2;

const createpost = async (req, res) => {
  try {
    // Destructure the title and description from req.body
    const { title, description } = req.body;
    const post = { title, description, user: req.user.userId };

    // Check if file is present
    if (req.file) {

      const uploadResponse = await uploadOnCloudinary(req.file.path);
      // console.log(uploadResponse);
      if (uploadResponse) {
        post.image = uploadResponse.secure_url; 
        post.cloudId = uploadResponse.public_id;
      } else {
        return res.status(500).json({
          success: false,
          message: "Error uploading file to Cloud",
        });
      }
    }

    // Create the post in the database
    const createUserPost = await postModel.create(post);

    // Update user's post list
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
    console.error("Error creating post:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};


const getPosts = async (req, res) => {
  try {
    const user = await userModule.findById(req.query?.id).populate("posts");

    if (!user) {
      return res.status(404).json(new ApiError(404, "Something went wrong", [
        "User not found",
      ]));
    }

    res.json({
      success: true,
      message: "Current user posts",
      posts: user.posts,
    });

  } catch (err) {
    // console.error("Error getting posts:", err);
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
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const posts = await postModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
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
  try {
    const userPost = await userModule.findByIdAndUpdate(req.user.userId , {
      $pull: {
        posts: req.body.postId,
      },
    });
  
    

    if(!userPost){
      return res.status(500).json(
        new ApiError(500, "Something went wrong", [
          "Error deleting post",
        ])
      )
    }

    const post = await postModel.findByIdAndDelete(req.body.postId);
  
    console.log(post);
  
    // cloudinary.v2.api
    // .delete_resources(['fzs95tjzfuipafhxscfv'], 
    //   { type: 'upload', resource_type: 'image' })
    // .then(console.log);
  
    // console.log(userPost.posts);
  
    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, error.message || "Something went wrong", [
        "Error deleting post",
      ])
    )
  }
};

const postController = {
  createpost,
  removePost,
  getPosts,
  getAllPost
};
module.exports = postController;





