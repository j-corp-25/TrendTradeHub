import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
} from "react-bootstrap";
import { register, clearMessage, reset } from "../app/user";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <Container className="my-10">
        <div>
          <BeatLoader />
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h2>Register</h2>
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>Email</FormLabel>
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
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="password2">
            <FormLabel>Confirm password</FormLabel>
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
