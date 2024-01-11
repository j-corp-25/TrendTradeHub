import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../app/userReducer";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "../pageStyles/ProfilePage.css";
import { Link } from "react-router-dom";
import { fetchProducts } from "../app/productReducer";

import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody > tr {
    background: ${({ bgColor }) => bgColor || '#171616'};
  }
`;

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.products);
  const user_products = products.filter(
    (product) => product.author._id === user._id
  );
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    image: user.image,
  });

  const getRandomColor = () => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33ffff', '#ff33f5'];
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
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
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

      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="main-box clearfix">
                <div class="table-responsive">
                  <table class="table user-list">
                    <thead>
                      <tr>
                        <th>
                          <span>Product</span>
                        </th>
                        <th>
                          <span>Category</span>
                        </th>
                        <th class="text-center">
                          <span>Price</span>
                        </th>
                        <th>
                          <span>Condition</span>
                        </th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img src={product.images[0]} alt="" />
                            <a
                              href={`#/product/${product._id}`}
                              className="user-link"
                            ></a>
                            <span className="user-subhead">
                              {product.title}
                            </span>
                          </td>
                          <td>
                            <span>{product.category}</span>
                          </td>
                          <td className="text-center">
                            <span className="label label-default">
                              {product.price}
                            </span>
                          </td>
                          <td>
                            <span className="condition-profile">
                              {product.condition}{" "}
                            </span>
                          </td>
                          <td>
                            <Link to={`/product/${product._id}`}>
                              <a href="#/" class="table-link">
                                <span class="fa-stack">
                                  <i class="fa fa-square fa-stack-2x"></i>
                                  <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                </span>
                              </a>
                            </Link>
                            <a href="#/" class="table-link">
                              <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
                              </span>
                            </a>
                            <a href="#/" class="table-link danger">
                              <span class="fa-stack">
                                <i class="fa fa-square fa-stack-2x"></i>
                                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
