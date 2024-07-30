const mongoose = require("mongoose");

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // userAvatar: {

    // },
    // createBy: {

    // },
    image: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// postModel.pre("save" , async function(next){

// })

module.exports = mongoose.model("Post", postModel);
