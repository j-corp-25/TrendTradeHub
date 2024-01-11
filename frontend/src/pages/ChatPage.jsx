import React from "react";
import { Container, Row, Col, FormControl, Button, Form } from "react-bootstrap";

const ChatPage = () => {
  return (
    <Container className="text-center border border-5">
      <Row>
        <Col xs={13} md={3} className="border-end p-3">
          <div>Conversations</div>
          <Form className="d-flex flex-column flex-lg-row me-1 p-1">
            <Col xs={13} md={8} className="mb-1 mb-lg-0 me-1">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="w-lg-auto"
              />
            </Col>
            <Col xs={13} md={4} className=" w-auto">
              <Button variant="outline-success" className=" container-sm">Search</Button>
            </Col>
          </Form>
        </Col>
        <Col xs={12} md={9}>
          <div>Message Container</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
