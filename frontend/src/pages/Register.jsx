import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
} from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container>
        <h2>Register</h2>
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter an email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter a password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="password2">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={formData.password2}
              onChange={onChange}
            />
          </FormGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
