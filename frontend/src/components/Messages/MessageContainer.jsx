import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Message from "./Message"
const MessageContainer = () => {
  const PlaceholderRows = () => (
    <Row className="gap-1" style={{ width: "60%" }}>
      <Col className="placeholder col-12 " style={{ height: "8px" }}></Col>
      <Col className="placeholder col-12 " style={{ height: "8px" }}></Col>
      <Col className="placeholder col-12" style={{ height: "8px" }}></Col>
    </Row>
  );
  return (
    <Container
      className="bg-light border rounded-md p-3"
      style={{ height: "600px", overflowY: "scroll" }}
    >
      <Row className="align-items-center mb-3">
        <Col xs="auto" className="d-flex align-items-center">
          <Image
            src="https://via.placeholder.com/150"
            roundedCircle
            style={{ width: "3rem", height: "3rem" }}
          />
          <strong className="ms-2">John Doe</strong>
        </Col>
      </Row>
      <hr />
      <div className="d-flex flex-column gap-4">
        {false &&
          [...Array(10)].map((_, i) => (
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
        <Message myMessage={true}/>
        <Message myMessage={true}/>
        <Message myMessage={false}/>
        <Message myMessage={false}/>
        <Message myMessage={true}/>
      </div>
    </Container>
  );
};

export default MessageContainer;
