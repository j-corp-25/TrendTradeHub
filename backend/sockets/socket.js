import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  // Retrieve the userId from the socket's handshake query
  const userId = socket.handshake.query.userId;

  // Add the user to the userSocketMap
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle the disconnect event
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    // Remove the disconnected user from the map
    if (userId !== "undefined") {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});


export { io, server, app };
