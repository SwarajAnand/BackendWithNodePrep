const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ["CUSTOMER", "ADMIN"]
    },
    token: {
        type: String,
        required: false,
        default: "",
      },
})

const UserSchema = mongoose.model("users", userSchema);
module.exports = UserSchema;