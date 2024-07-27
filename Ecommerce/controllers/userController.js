const UserSchema = require("../models/userModels");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const dotenv = require("dotenv");

dotenv.config();

const signup = async (req, res) => {
  console.log(req.body);
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(new ApiError(401, "Invalid email address"));
  }

  try {
    const existingUser = await UserSchema.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json(new ApiError(401, "User already exists"));
    }

    const createdUser = await UserSchema.create({
      ...req.body,
      role: "CUSTOMER",
    });

    return res.json({
      success: true,
      message: "User Created",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(
        new ApiError(500, err.message || "Something went wrong", [
          "Something went wrong",
        ])
      );
  }
};

// console.log(process.env.SECRET_TOKEN_KEY)

// login = Authentication
const login = async (req, res) => {
  const user = await UserSchema.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const { password } = req.body;
  const isPasswordValid = await user.checkPassword(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Wrong Password"));
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
    mobileNo: user.mobile,
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_TOKEN_KEY, {
    expiresIn: "1d",
  });
  await UserSchema.findByIdAndUpdate(user._id, { $set: { token: token } });

  // res.cookies("Authorization", `Bearer ${token}`);

  return res.status(200)
  .cookie("Authorization", `Bearer ${token}`, { httpOnly: true, secure: true })
  .json({
    success: true,
    message: "Login successfully",
    token: `Bearer ${token}`,
    role: user.role,
  });
};

const userController = {
  signup,
  login,
};

module.exports = userController;
