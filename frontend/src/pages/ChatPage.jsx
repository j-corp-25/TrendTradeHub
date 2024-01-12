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
import MessageContainer from "../components/Messages/MessageContainer";
import { GiConversation } from "react-icons/gi";
import { FaComments } from "react-icons/fa";

const ChatPage = () => {
  return (
    <Container className="text-center p-0 mt-2  bg-light rounded-4"
    style={{ height: "700px" }} >
      <Row>
        <Col xs={12} md={5} lg={4} className="border-end p-3">
          <div className="mb-3">Conversations</div>
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
          <div
            style={{ overflowY: "scroll", maxHeight: "calc(100vh - 600px)" }}
          >
            {false &&
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
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </Col>

        <Col xs={12} md={7} lg={8}>
          <Row className="align-items-center justify-content-center">
            {/* <Col
              md={9}
              className="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <FaComments size={100} />
              <div style={{ fontSize: "20px" }}>
                Select a conversation to start messaging
              </div>
            </Col> */}
            <Col xs={12}>
              <MessageContainer />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
