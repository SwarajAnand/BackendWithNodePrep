const express = require("express");
const userRouter = require("./routers/prepRouter");
const app = express();

app.use(express.json());

app.use(userRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});