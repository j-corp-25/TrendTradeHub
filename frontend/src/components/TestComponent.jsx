import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const TestComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize the socket connection inside useEffect
    const socket = io(SOCKET_SERVER_URL);

    socket.on("message", (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    });

    // Cleanup function to disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, []); // The empty dependency array ensures this runs once on mount and once on unmount

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      // Use the existing socket connection to emit the message
      const socket = io(SOCKET_SERVER_URL);
      socket.emit("message", message);
      setMessage("");
      // Do not disconnect after sending the message
    }
  };

  return (
    <div>
      <h1>React Socket.IO Test</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default TestComponent;
