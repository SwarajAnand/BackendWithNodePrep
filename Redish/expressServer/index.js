const { createClient } = require("redis"); 
const express = require("express");

const app = express();
app.use(express.json());
const PORT = 8080;

const redisClient = createClient();

app.post("/submit", async (req, res) => {
    const { name, email, code } = req.body;
    try {
        await redisClient.lPush("users", JSON.stringify({ name, email, code }));
        return res.status(200).json({ success: true })
    } catch (err) {
        console.log("Error occured", err)
    }
})

const startServer = async () => {
    try {
        await redisClient.connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (err) {
        console.log("Server failed", err)
    }
}

startServer()