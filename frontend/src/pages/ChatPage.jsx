import React from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import Conversation from "../components/Messages/Conversation";
import MessageContainer from "../components/Messages/MessageContainer"
import { GiConversation } from "react-icons/gi";
import { FaComments } from 'react-icons/fa'

const ChatPage = () => {
  return (
    <Container className="text-center border border-5">
      <Row>
        <Col xs={12} md={3} className="border-end p-3">
          <div>Conversations</div>
          <Form className="d-flex flex-column flex-lg-row me-1 p-1">
            <Col xs={12} md={8} className="mb-2 mb-lg-1 me-1 ">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </Col>
            <Col xs={12} md={4} className=" w-auto ">
              <Button variant="outline-success" className=" container-sm">
                Search
              </Button>
            </Col>
          </Form>
          {true &&
            [0, 1, 2, 4, 5].map((_, i) => (
              <div
                key={i}
                className="d-flex align-items-center mb-2  placeholder-glow"
              >
                <span
                  className="placeholder rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                ></span>
                <div className="flex-grow-1">
                  <span className="placeholder col-12 "></span>
                  <span className="placeholder col-7 "></span>
                </div>
              </div>
            ))}
          <Conversation />
          <Conversation />
          <Conversation />
        </Col>
        <Col xs={12} md={9}>
          <Row
            className="align-items-center justify-content-center w-auto"
            style={{ height: "600px" }}
          >
            <Col
              md={9}
              className="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <FaComments size={100} />
              <div style={{ fontSize: "20px" }}>
                Select a conversation to start messaging
              </div>
            </Col>
            <Col md={3}>
              <MessageContainer/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
