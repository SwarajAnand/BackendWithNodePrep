const express = require("express");

const {listProducts, createProduct} = require("../controllers/product");
// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list", listProducts);

router.post("/create", createProduct);
module.exports = router;