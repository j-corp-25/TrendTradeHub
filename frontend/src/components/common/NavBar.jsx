import React, {useEffect} from "react";
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
  Nav,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import "./NavBar.css";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { logout, performLogout, reset } from "../../app/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(performLogout());
    dispatch(reset());
    navigate("/login");
  };
  const userId = useParams();
  const users = useSelector((state) => state.auth.all);
  const user = users.find((user) => user._id === userId);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="my-3">
          <LinkContainer to="/products">
            <NavbarBrand>TrendTradeHub</NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 search-bar"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>

            <Nav className="ms-auto">
              {user ? (
                <>
                  <NavLink onClick={onLogout}>
                    <FaSignOutAlt />
                    Log Out
                  </NavLink>
                  <LinkContainer to={`/profile/${user._id}`}>
                    <NavLink>
                      <FaUserAlt />
                      Profile
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/products">
                    <NavLink>Products</NavLink>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <NavLink>
                      <FaSignInAlt />
                      Log In
                    </NavLink>
                  </LinkContainer>

                  <LinkContainer to="/products">
                    <NavLink>Products</NavLink>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
