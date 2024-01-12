import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, message } = req.body;
  const senderId = req.user._id;
  if (!recipientId || !message) {
    throw new Error("Invalid request parameters");
  }
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, recipientId] },
  });
  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, recipientId],
      lastMessage: {
        text: message,
        sender: senderId,
      },
    });
  }
  await conversation.save();

  const newMessage = new Message({
    conversationId: conversation._id,
    sender: senderId,
    text: message,
  });

  await Promise.all([
    newMessage.save(),
    conversation.updateOne({
      lastMessage: {
        text: message,
        sender: senderId,
      },
    }),
  ]);

  res.status(201).json(newMessage);
});

export { sendMessage };
