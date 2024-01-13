import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../app/userReducer";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaCheck, FaTimes, FaComment } from "react-icons/fa";
import "../pageStyles/ProfilePage.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../app/productReducer";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../app/userReducer";
import ProductUnit from "../components/Products/ProductUnit";

import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody > tr {
    background: ${({ bgColor }) => bgColor || "#171616"};
  }
`;

function Profile() {
  const userId = useParams();
  const users = useSelector((state) => state.auth.all);
  const user = users.find((user) => user._id === Object.values(userId)[0]);
  // const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.products);
  const user_products = products.filter(
    (product) => product.author?._id === user?._id
  );
  const sessionUser = useSelector((state) => state.auth.user._id);
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    image: user?.image || "",
  });

  const getRandomColor = () => {
    const colors = ["#ff5733", "#33ff57", "#5733ff", "#33ffff", "#ff33f5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
  const [loading, setLoading] = useState(true);

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

    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    for (let [key, value] of formData.entries()) {
    }

    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers());
      await dispatch(fetchProducts());
      setLoading(false);
    };
    fetchData();
  }, [userId, dispatch]);

  return (
    <>
      {!loading && (
        <div className="body-profile">
          <Container className="mt-5 info-container">
            <Card>
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
                      <img
                        src={user.image}
                        alt="Profile"
                        className="profile-image"
                      />
                    </div>
                    <div className="info-user">
                      <p style={{ color: "gray", fontSize: "20px" }}>
                        {user.name}
                      </p>
                      {sessionUser === Object.values(userId)[0] ? (
                        <Button
                          variant="primary"
                          onClick={() => setEditMode(true)}
                          style={{
                            width: "fit-content",
                            background: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyItems: "center",
                            margin: "auto",
                          }}
                        >
                          <FaEdit
                            className="mr-1"
                            style={{
                              width: "fit-content",
                              background: "black",
                            }}
                          />{" "}
                          Edit
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          style={{
                            width: "fit-content",
                            background: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyItems: "center",
                            margin: "auto",
                          }}
                        >
                          <FaComment
                            className="mr-1"
                            style={{
                              width: "fit-content",
                              background: "black",
                            }}
                          />{" "}
                          Message Me
                        </Button>
                      )}
                    </div>
                  </div>
                )}
            <div className="product-list">
              {user_products.map((product) => (
                <ProductUnit key={product._id} productId={product._id} />
              ))}
            </div>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
}

export default Profile;
