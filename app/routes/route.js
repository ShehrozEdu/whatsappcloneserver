const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const Conversation = require("../controllers/ConversationController");
const Messages = require("../controllers/MessagesController");

Router.post("/add-user", UserController.addUser);
Router.get("/get-user", UserController.getUser);

Router.post("/conversation/add", Conversation.newConversation);
Router.post("/conversation/get", Conversation.getConversation);
Router.post("/messages/add", Messages.send);
Router.post("/messages/get/:id", Messages.getMessages);
module.exports = Router;
