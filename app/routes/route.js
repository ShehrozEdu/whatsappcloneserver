const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const Conversation = require("../controllers/ConversationController");
const Messages = require("../controllers/MessagesController");
const FileController = require("../controllers/FileController");
const Middleware = require("../middleware/Middleware");

Router.post("/add-user", UserController.addUser);
Router.get("/get-user", UserController.getUser);

Router.post("/conversation/add", Conversation.newConversation);
Router.post("/conversation/get", Conversation.getConversation);
Router.post("/messages/add", Messages.send);
Router.get("/messages/get/:id", Messages.getMessages);

//File

Router.post(
  "/files/upload",
  Middleware.uploadImg.single("file"),
  FileController.fileUpload
);
module.exports = Router;
