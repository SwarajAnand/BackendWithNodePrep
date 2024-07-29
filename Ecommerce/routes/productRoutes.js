const express = require("express");

const {listProducts, createProduct} = require("../controllers/product");
const roleMiddleware = require("../middlewares/roleMiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list", listProducts);

router.post("/create", roleMiddleware("SELLER"), createProduct);
module.exports = router;