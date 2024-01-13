import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUserProfile } from "../app/userReducer";
import {
  getConversations,
  resetConversations,
} from "../app/conversationReducer";
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
import { toast } from "react-toastify";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { conversations, isLoading, error } = useSelector(
    (state) => state.conversations
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [displayConversations, setDisplayConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  console.log(conversations);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(findUserProfile(searchQuery));
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };
  useEffect(() => {
    setDisplayConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    dispatch(getConversations());

    return () => {
      dispatch(resetConversations());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      return;
    }

    if (userProfile) {
      if (userProfile._id === user._id) {
        toast.error("Can't message yourself!");
        return;
      }

      const existingConversation = conversations.find((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === userProfile._id
        )
      );

      let tempConversations = [...displayConversations]; // Temporary variable

      if (existingConversation) {
        setSelectedConversation(existingConversation);
      } else {
        const mockId = `mock-${userProfile._id}`;
        const existingMockIndex = tempConversations.findIndex(
          (conv) => conv._id === mockId
        );

        const mockConvo = {
          mock: true,
          lastMessage: { text: "", sender: "" },
          _id: mockId,
          participants: [
            {
              _id: userProfile._id,
              name: userProfile.name,
              image: userProfile.image,
            },
            { _id: user._id, name: user.name, image: user.image },
          ],
        };

        if (existingMockIndex === -1) {
          // Add a new mock conversation
          tempConversations.push(mockConvo);
        } else {
          // Replace existing mock conversation
          tempConversations[existingMockIndex] = mockConvo;
        }

        setSelectedConversation(mockConvo);
      }

      setDisplayConversations(tempConversations); // Update state once at the end
    }
  }, [userProfile, isError, message, user, conversations]);

  return (
    <Container
      className="text-center p-0 mt-2  bg-light rounded-4"
      style={{ height: "700px" }}
    >
      <Row>
        <Col xs={12} md={5} lg={4} className="border-end p-3">
          <div className="mb-3">Conversations</div>
          <Form
            onSubmit={handleSearch}
            className="d-flex flex-column flex-lg-row me-1 p-1"
          >
            <Col xs={12} md={8} className="mb-2 mb-lg-1 me-1 ">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </Col>
            <Col xs={12} md={4} className=" w-auto ">
              <Button
                variant="outline-success"
                onClick={handleSearch}
                className=" container-sm"
              >
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
              displayConversations &&
              displayConversations.map((conversation) => (
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
