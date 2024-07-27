const jwt = require("jsonwebtoken");

const listProducts = async (req, res) => {
  const header = req.headers;
  const token = header.authorization.split(" ")[1];

  jwt.verify(token, "secret");

  const bearerToken = jwt.decode(token, "secret");
  console.log(bearerToken);

  // Token validation
  res.json({
    success: true,
  });
};

const createProduct = async (req, res) => {
  res.json({
    success: true,
    message: "Product created successfully",
  });
};

const productController = {
  listProducts,
  createProduct,
};

module.exports = productController;
