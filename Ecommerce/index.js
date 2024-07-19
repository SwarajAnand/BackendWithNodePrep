const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const mongoose = require("mongoose");

const PORT = 8080;

app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
.then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
.catch(err => console.log(err))





