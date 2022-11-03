const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");

Router.post("/add-user", UserController.addUser);
Router.get("/get-user", UserController.getUser);
module.exports = Router;
