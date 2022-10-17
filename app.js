require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors());




//Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to PORT 5000");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
