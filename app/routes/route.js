const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");

Router.get("/add-user", UserController.addUser);

module.exports = Router;
