const express = require("express");

const fileRouter = express.Router();

fileRouter.post("/api/file", (req, res) => {

    return res.status(200).json({
        success: true,
        message: "File uploaded successfully"
    })
})

module.exports = fileRouter;