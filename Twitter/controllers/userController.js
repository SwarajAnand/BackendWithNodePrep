const userModule = require("../model/user.model");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const signup = async (req, res) => {
  console.log(req.body);
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(new ApiError(401, "Invalid email address"));
  }

  try {
    const existingUser = await userModule.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json(new ApiError(401, "User already exists"));
    }

    const newUser = req.body;
    // console.log(...newUser)

    const createdUser = await userModule.create(newUser);

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

const login = async (req, res) => {
  const user = await userModule.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const { password } = req.body;
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Wrong Password"));
  }

  const jwtPayload = {
    userId: user._id,
    mobileNo: user.mobile,
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_TOKEN_KEY, {
    expiresIn: "1d",
  });
  await userModule.findByIdAndUpdate(user._id, { $set: { token: token } });

  req.userDetail = user;

  return res
    .status(200)
    .cookie("Authorization", `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message: "Login successfully",
      token: `Bearer ${token}`,
    });
};

const logout = async (req, res) => {
  const logOutUser = await userModule.findByIdAndUpdate(req.user.userId, {
    $set: { token: null },
  });

  return res.status(200).json({
    success: true,
    message: `User Logout successfully`,
  });
};

const updateUser = async (req, res) => {
  const logOutUser = await userModule.findByIdAndUpdate(req.user.userId, {
    $set: { mobile: 565555545, email: "sdsdsd" },
  });

  return res.status(200).json({
    success: true,
    message: `User updated successfully`,
  });
}

const userController = {
  signup,
  login,
  logout,
  updateUser
};

module.exports = userController;
