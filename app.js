require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./app/routes/route");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use("/api", Router);

//Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Go chat, don't waste time here");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
