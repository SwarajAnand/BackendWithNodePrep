const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ApiError = require("../utils/ApiError");

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json(new ApiError(401, "Invalid token or expired token."));
    }

    const userToken = authHeader.split(" ")[1];
    const data = await jwt.verify(userToken, process.env.SECRET_TOKEN_KEY);

    console.log(data);

    req.user = data;

    next();
  } catch (error) {
    // console.error("Token verification error:", error.message);
    return res
      .status(401)
      .json(new ApiError(401, "Invalid token or expired token.", [error]));
  }
};

module.exports = verifyToken;
