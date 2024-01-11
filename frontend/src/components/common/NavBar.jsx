import React from "react";
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
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
  FaCommentAlt,
  FaTshirt,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { logout, performLogout, reset } from "../../app/userReducer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(performLogout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="my-4">
          <LinkContainer to="/products">
            <NavbarBrand>TrendTradeHub</NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav> {/* Empty Nav for spacing */}
            <Form className="d-flex mx-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 search-bar"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav>
              {user ? (
                <>
                  <NavLink className="d-flex align-items-center justify-content-center-lg space-right2" onClick={onLogout}>
                    <FaSignOutAlt className="me-1"/>
                    Log Out
                  </NavLink>
                  <LinkContainer to="/profile">
                    <NavLink className="d-flex align-items-center justify-content-center-lg" >
                      <FaUserAlt className="me-1"/>
                      Profile
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/products">
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaTshirt className="me-1" /> Products
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/conversations">
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaCommentAlt className="me-1"/> Messages
                    </NavLink>
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
