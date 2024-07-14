const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./route/jobRoute");

const app = express();

mongoose.connect("mongodb://localhost:27017/geekster")
.then(() => {
    console.log("DB Connected")
})
.catch(err => console.log("Error"))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });
  
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
  });

app.use(express.json());
app.use(jobRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})