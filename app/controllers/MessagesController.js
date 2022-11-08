const Message = require("../models/MessagesModal");
const Conversation = require("../models/ConversationModal");

const MessagesController = {
  send: async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      await newMessage.save();
      await Conversation.findByIdAndUpdate(req.body.conversationId, {
        message: req.body.text,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = MessagesController;
