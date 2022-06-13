const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
       
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
