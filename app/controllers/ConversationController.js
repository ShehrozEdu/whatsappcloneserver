const Conversation = require("../models/ConversationModal");

const ConversationController = {
  newConversation: async (req, res) => {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;

      const exist = await Conversation.findOne({
        members: { $all: [receiverId, senderId] },
      }); // $all = Search for an item in array
      if (exist) {
        return res.status(200).json("Conversation already exists");
      }
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      return res.status(200).json("Conversation saved successfully");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};

module.exports = ConversationController;
