import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { FaComments } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateLastMessage } from "../../app/conversationReducer";
import {
  getMessages,
  resetMessages,
  addIncomingMessage,
} from "../../app/messagesReducer";
import { useSocket } from "../../context/SocketContext";
const MessageContainer = ({ selectedConversation }) => {
  const messageEndRef = useRef(null);
  const dispatch = useDispatch();
  // console.log({ SelectedConvoFromContainer: selectedConversation });
  const { messages, isLoading, error } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSocket();

  // console.log(messages);
  const PlaceholderRows = () => (
    <Row className="gap-1" style={{ width: "60%" }}>
      <Col className="placeholder col-12 " style={{ height: "8px" }}></Col>
      <Col className="placeholder col-12 " style={{ height: "8px" }}></Col>
      <Col className="placeholder col-12" style={{ height: "8px" }}></Col>
    </Row>
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log("Socket object:", socket);

    if (socket) {
      socket.on("newMessage", (incomingMessage) => {
        dispatch(
          updateLastMessage(incomingMessage.conversationId, {
            text: incomingMessage.text,
            sender: incomingMessage.sender,
          })
        );

        if (selectedConversation?._id === incomingMessage.conversationId) {
          dispatch(addIncomingMessage(incomingMessage));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, dispatch, selectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      const otherParticipant = selectedConversation.participants.find(
        (participant) => participant._id !== user._id
      );

      const otherParticipantId = otherParticipant._id;
      dispatch(getMessages(otherParticipantId));
    }

    return () => {
      dispatch(resetMessages());
    };
  }, [dispatch, selectedConversation, user._id]);

  // console.log(selectedConversation);
  if (!selectedConversation) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <FaComments size={100} className=" mt-5" />
        <div style={{ fontSize: "40px" }}>
          Select a conversation to start messaging
        </div>
      </div>
    );
  }
  const otherParticipant = selectedConversation.participants.find(
    (participant) => participant._id !== user._id
  );

  return (
    <Container
      className="bg-light border rounded-md p-1 g-5"
      style={{ height: "600px" }}
    >
      <Row className="align-items-center mb-3 p-3">
        <Col xs="auto" className="d-flex align-items-center">
          <Image
            src={otherParticipant.image}
            className="profile-image"
            style={{ width: "3rem", height: "3rem" }}
          />
          <strong className="ms-2">{otherParticipant.name}</strong>
        </Col>
      </Row>
      <hr />
      <div
        style={{ overflowY: "auto", height: "calc(100% - 115px)" }}
        className=" gap-1"
      >
        {isLoading &&
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="d-flex align-items-center mb-2 placeholder-glow gap-2"
            >
              {i % 2 === 0 && (
                <>
                  <span
                    className="placeholder rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  ></span>
                  <PlaceholderRows />
                </>
              )}
              {i % 2 !== 0 && (
                <>
                  <div className="flex-grow-1 d-flex justify-content-end">
                    <PlaceholderRows />
                  </div>
                  <span
                    className="placeholder rounded-circle ms-2"
                    style={{ width: "40px", height: "40px" }}
                  ></span>
                </>
              )}
            </div>
          ))}
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            myMessage={message.sender === user._id}
            otherParticipant={otherParticipant}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="mt-3 flex-row">
        <MessageForm
          otherParticipantId={otherParticipant._id}
          conversationId={selectedConversation._id}
        />
      </div>
    </Container>
  );
};

export default MessageContainer;
