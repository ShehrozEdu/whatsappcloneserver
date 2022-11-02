require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./app/routes/route");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors());
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
