const UserSchema = require("../models/userModels");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log(req.body);
  const user = await UserSchema.create({
    ...req.body,
    role: "CUSTOMER",
  });
  res.json({
    success: true,
    message: "User Created",
  });
};

// login = Authentication 
const login = async (req, res) => {

  const user = await UserSchema.findOne({ email: req.body.email });
  console.log(user);

  if(!user){
    return res.status(401).json({
      success: false,
      message: "User not found"
    })
  }

  const jwtPayload = {
    userId : user._id,
    role : user.role,
    mobileNo : user.mobile,
    expiresIn : "1d"
  }

  const token = jwt.sign( jwtPayload, "secret");

  await UserSchema.findByIdAndUpdate(user._id, { $set: { token: token }});
  res.json({
    success: true,
    message: "User Logged In",
    token,
  });
};

const userController = {
  signup,
  login,
};

module.exports = userController;
