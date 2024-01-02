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
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";


function NavBar() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="my-3">
          <LinkContainer to="/">
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
              <LinkContainer to="/login">
                <NavLink>
                  <FaSignInAlt /> Log In
                </NavLink>
              </LinkContainer>

              <LinkContainer to="/register">
                <NavLink>
                  <FaSignInAlt />
                  Sign Up
                </NavLink>
              </LinkContainer>

              <LinkContainer to="/logout">
                <NavLink href="/logout">
                  <FaSignOutAlt />
                  Log Out
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/profile">
                <NavLink href="/profile">
                  <FaUserAlt />
                  Profile
                </NavLink>
              </LinkContainer>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
