import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../app/userReducer";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "../pageStyles/ProfilePage.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../app/productReducer";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.products);
  const user_products = products.filter(
    (product) => product.author === user._id
  );
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    image: user.image,
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const imageSrc =
    userData.image instanceof File
      ? URL.createObjectURL(userData.image)
      : userData.image;

  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUserData({
        ...userData,
        image: e.target.files[0],
      });
    }
  };

  const handleProfileUpdate = () => {
    const formData = new FormData();

    if (userData.image instanceof File) {
      formData.append("image", userData.image);
    }

    if (user.name !== userData.name) {
      formData.append("name", userData.name);
    }
    if (user.email !== userData.email) {
      formData.append("email", userData.email);
    }
    if (userData.password) {
      formData.append("password", userData.password);
    }

    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <FaUserAlt className="mr-2" /> Profile
        </Card.Header>
        <Card.Body>
          {editMode ? (
            <Form>
              <Form.Group controlId="formImage">
                <Form.Label>Profile Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </Form.Group>

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
              <Button variant="danger" onClick={() => setEditMode(false)}>
                <FaTimes className="mr-1" /> Cancel
              </Button>
            </Form>
          ) : (
            <div>
              <div className="profile-header">
                <img src={imageSrc} alt="Profile" className="profile-image" />
              </div>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <Button variant="primary" onClick={() => setEditMode(true)}>
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
