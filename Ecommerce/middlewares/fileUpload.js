const multer = require('multer');
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: './public' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

module.exports = multer({ storage: storage })