import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../app/messagesReducer";

const MessageForm = ({ otherParticipantId }) => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      dispatch(sendMessage(otherParticipantId, messageText));
      setMessageText("");
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
