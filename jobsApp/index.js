const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./route/jobRoute");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_LINK)
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
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})