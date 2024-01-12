import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const Message = ({ message, myMessage }) => {
  const { user } = useSelector((state) => state.auth);
  const myMessageStyle = {
    backgroundColor: "#DCF8C6",
    color: "#000000",
  };

  const otherMessageStyle = {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  };

  return (
    <div
      className={`d-flex align-items-center mb-2 ${
        myMessage ? "justify-content-end" : ""
      }`}
    >
      {!myMessage && (
        <Image
          src="https://via.placeholder.com/150"
          roundedCircle
          style={{ width: "3rem", height: "3rem", marginRight: "10px" }}
        />
      )}
      <div
        className="text-start p-2"
        style={{
          width: "400px",
          ...(myMessage ? myMessageStyle : otherMessageStyle),
        }}
      >
        {message.text}
      </div>
      {myMessage && (
        <Image
          src={user.image}
          roundedCircle
          style={{ width: "3rem", height: "3rem", marginLeft: "10px" }}
        />
      )}
    </div>
  );
};

export default Message;
