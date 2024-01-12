import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import "./Conversation.css"

const Conversation = ({ conversationData,onClick, isSelected }) => {
  const { participants, lastMessage } = conversationData;
  const otherParticipant = participants[1];
  const currentUser = participants[0];
  const conversationClass = isSelected ? 'conversation conversation-active' : 'conversation';
  return (
    <Container
    className={`d-flex align-items-center gap-1 p-2 ${conversationClass}`}
      style={{ cursor: "pointer", borderRadius: "0.375rem" }}
      onClick={onClick}
    >
      <div className="position-relative">
        <img
          src={otherParticipant.image}
          className="profile-image"
          style={{ width: "3rem", height: "3rem" }}
          alt="Profile"
        />
        
       {/* active status */}
        {true && (
          <span
            className="position-absolute bottom-1 right-1 end-0 translate-middle p-1 bg-success border border-light rounded-circle"
            style={{ width: "1rem", height: "1rem" }}
          ></span>
        )}
      </div>

      <div className="flex-grow-1 w-50 p-1">
        <div className="text-start text-truncate mb-1">
          {otherParticipant.name}
        </div>
        <div className="d-flex align-items-center text-start text-truncate gap-1">
          {currentUser._id === lastMessage.sender && (
            <FaCheck size={14} />
          )}
          <span style={{ color: '#333' }}className="">{lastMessage.text}</span>
        </div>
      </div>
    </Container>
  );
};

export default Conversation;
