const express = require("express");
const app = express();

app.use(express.json());

const loggerApp = (req, res, next) => {
    const currentTimestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;

    console.log(`[${currentTimestamp}] ${method} request to ${url} from ${ip}`);

    next();
}

app.use(loggerApp);

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.get("/users", (req, res) => {
    res.status(200).send("Hello World from Users");
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
