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
    // if (isSuccess || user) {
    //   navigate("/");
    // }

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
      password2: formData.password2,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <Container className="my-6">
        <div>
          <BeatLoader />
        </div>
      </Container>
    );
  }

  return (
    <div class="form-container sign-up-container">
        
        <Form onSubmit={onSubmit} className="formDual">
          <h1>Create account </h1>
          <FormGroup className="mb-3" controlId="name">
            <FormControl
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="email">
     
            <FormControl
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="password">
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="password2">
            <FormControl
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={formData.password2}
              onChange={onChange}
            />
          </FormGroup>

          <Button variant="primary" type="submit" className="dualButton">
            Submit
          </Button>
        </Form>
    </div>
  );
}

export default Register;
