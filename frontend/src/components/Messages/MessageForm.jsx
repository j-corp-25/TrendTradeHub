import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../app/messagesReducer";
import { updateLastMessage } from "../../app/conversationReducer";

const MessageForm = ({ otherParticipantId, conversationId }) => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  console.log({ otherUser: otherParticipantId, convo: conversationId });

  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      try {
        await dispatch(sendMessage(otherParticipantId, messageText));
        dispatch(
          updateLastMessage(conversationId, {
            text: messageText,
            sender: user._id,
          })
        );
        setMessageText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <Form onSubmit={handleSendMessage}>
      <Form.Group controlId="messageText" className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            name="text"
            placeholder="Type your message here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit">
            <BsFillChatDotsFill />
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
