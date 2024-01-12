import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs"; // Importing Bootstrap icon

const MessageForm = ({setMessage}) => {
  return (
    <Form onSubmit={handleSendMessage}>
      <Form.Group controlId="text" className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            name="text"
            placeholder="Type your message here..."
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
