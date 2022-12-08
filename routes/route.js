const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const Conversation = require("../controllers/ConversationController");
const Messages = require("../controllers/MessagesController");
const FileController = require("../controllers/FileController");
const upload = require("../../server/middleware/upload");

Router.post("/add-user", UserController.addUser);
Router.get("/get-user", UserController.getUser);

Router.post("/conversation/add", Conversation.newConversation);
Router.post("/conversation/get", Conversation.getConversation);
Router.post("/messages/add", Messages.send);
Router.get("/messages/get/:id", Messages.getMessages);

//File

Router.post("/file/upload", upload.single("file"), FileController.fileUpload);
Router.get("/file/:filename", FileController.getImage);
module.exports = Router;
//hello
