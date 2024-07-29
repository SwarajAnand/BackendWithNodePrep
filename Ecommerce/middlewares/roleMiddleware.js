const UserSchema = require("../models/userModels");
const ApiError = require("../utils/ApiError");

const roleMiddleware = (role) => async (req, res, next) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    if (user.role !== role) {
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }

    next();
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Server Error"));
  }
};

module.exports = roleMiddleware;
