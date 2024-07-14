const express = require("express");
var responseTime = require("response-time");
const app = express();
const PORT = 8080;

const logger = (req, res, next) => {
  // console.log("Logging...");
  console.log(
    `Req Method: ${req.method} \nReq Path: ${
      req.path
    } \n$TimeStamp : ${Date.now()}`
  );
  next();
};

app.use(responseTime((req, res, time) => {
    console.log(`Response Time: ${time}ms`);
}));

app.use(logger);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
