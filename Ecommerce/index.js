const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose");

const PORT = 8080;

app.use(express.json());
app.use(cors());
dotenv.config();

// console.log(process.env.DB_LINK)

app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRoutes);

mongoose.connect(process.env.DB_LINK || "mongodb://127.0.0.1:27017/Ecommerce")
.then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
.catch(err => console.log(err))





