const express = require("express");
const randomJokes = require("./jokesData");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api hit successfully",
        data: randomJokes[Math.random() * randomJokes.length | 0],
    });
})

app.get("/api/images/random", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})