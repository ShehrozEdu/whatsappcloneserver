const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const Conversation = require("../controllers/ConversationController");

Router.post("/add-user", UserController.addUser);
Router.get("/get-user", UserController.getUser);

Router.post("/conversation/add", Conversation.newConversation);
module.exports = Router;
