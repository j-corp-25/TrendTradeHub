import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../app/user";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProfileUpdate = () => {
    dispatch(updateProfile(userData));
    setEditMode(false);
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <FaUserAlt className="mr-2" /> Profile
        </Card.Header>
        <Card.Body>
          {editMode ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="success"
                className="mr-2"
                onClick={handleProfileUpdate}
              >
                <FaCheck className="mr-1" /> Save
              </Button>
              <Button
                variant="danger"
                onClick={() => setEditMode(false)}
              >
                <FaTimes className="mr-1" /> Cancel
              </Button>
            </Form>
          ) : (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <Button
                variant="primary"
                onClick={() => setEditMode(true)}
              >
                <FaEdit className="mr-1" /> Edit
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
