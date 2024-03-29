import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocket, io } from "../sockets/socket.js";




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

  const recipientSocketId = getRecipientSocket(recipientId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [userId, otherUserId] },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const messages = await Message.find({
    conversationId: conversation._id,
  }).sort({ createdAt: 1 });

  res.status(200).json(messages);
});

const getConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await Conversation.find({
    participants: userId,
  }).populate({
    path: "participants",
    select: "name image",
  });

  res.status(200).json(conversations);
});

export { sendMessage, getMessages, getConversations };
