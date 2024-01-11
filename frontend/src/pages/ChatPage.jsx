import React from "react";
import { Container, Row, Col, FormControl, Button, Form } from "react-bootstrap";

const ChatPage = () => {
  return (
    <Container className="text-center border border-5 gap-4">
      <Row>
        <Col xs={12} md={3} className="border-end">
          <div>Conversations</div>
          <Form className="d-flex flex-column flex-md-row">
            <Col xs={12} md={8} className="mb-2 mb-md-0">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </Col>
            <Col xs={12} md={4}>
              <Button variant="outline-success" className="w-100">Search</Button>
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
