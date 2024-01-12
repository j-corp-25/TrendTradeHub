import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversations, resetConversations } from "../app/messagesReducer";
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

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, error, conversations } = useSelector(
    (state) => state.messages
  );
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  useEffect(() => {
    dispatch(getConversations());

    return () => {
      dispatch(resetConversations());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Conversations:", conversations);
  }, [conversations]);
  return (
    <Container
      className="text-center p-0 mt-2  bg-light rounded-4"
      style={{ height: "700px" }}
    >
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
            {isLoading &&
              [0, 1, 2, 4, 5, 6, 7].map((_, i) => (
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
            {!isLoading &&
              conversations &&
              conversations.map((conversation) => (
                <Conversation
                  key={conversation._id}
                  conversationData={conversation}
                  onClick={() => handleConversationClick(conversation)}
                  isSelected={selectedConversation?._id === conversation._id}
                />
              ))}
          </div>
        </Col>

        <Col xs={12} md={7} lg={8}>
          <Row className="align-items-center justify-content-center">
            <Col xs={12}>
              <MessageContainer selectedConversation={selectedConversation} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
