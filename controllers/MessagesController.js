const Message = require("../models/MessagesModal");
const Conversation = require("../models/ConversationModal");

const MessagesController = {
  send: async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      await newMessage.save();
      await Conversation.findOneAndUpdate(req.body.conversationId, {
        message: req.body.text,
      });
      return res.status(200).json("Message Sent successfully");
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  getMessages: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = MessagesController;
