const express = require("express");
const fileRouter = require("./router/fileRoute");

const app = express();

// app.use(express.json());

const PORT = 8080;

app.use(fileRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})