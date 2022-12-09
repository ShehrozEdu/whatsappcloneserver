const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("conversation", userSchema);
module.exports = Conversation;
