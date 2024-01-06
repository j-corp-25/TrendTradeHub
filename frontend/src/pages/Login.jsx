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
import { reset, login } from "../app/user";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <Container className="my-5">
        <div>
          <BeatLoader />
        </div>
      </Container>
    );
  }

  return (
    <div class="form-container sign-in-container">
      
        
        <Form onSubmit={onSubmit} className="formDual">
          <h1>Sign in</h1>
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
          <Button variant="primary" type="submit" className="dualButton">
            Submit
          </Button>
        </Form>
      
    </div>
  );
}

export default Login;
