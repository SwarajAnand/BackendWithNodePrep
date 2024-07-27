const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}



const UserSchema = mongoose.model("users", userSchema);
module.exports = UserSchema;