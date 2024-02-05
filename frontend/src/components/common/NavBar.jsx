import React, { useEffect } from "react";
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
  FaShoppingCart
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { logout, performLogout, reset } from "../../app/userReducer";
import { useNavigate, useParams } from "react-router-dom";
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
      <Navbar bg="dark" variant="dark" expand="xl" collapseOnSelect>
        <Container className="my-5">
          <LinkContainer to="/products">
            <NavbarBrand>TrendTradeHub</NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
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
                  <LinkContainer to="/newproduct">
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaTshirt className="me-1" /> Sell Product
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/conversations">
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaCommentAlt className="me-1" />
                       Messages
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to={`/profile/${user._id}`}>
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaUserAlt className="me-1" />
                      {/* Profile */}
                    </NavLink>
                  </LinkContainer>
                  
                  <LinkContainer to={`/cart`} style={{color:'lightgray'}}>
                    <NavLink className="d-flex align-items-center justify-content-center-lg">
                      <FaShoppingCart className="me-1" />
                    </NavLink>
                  </LinkContainer>
                  <NavLink
                    className="d-flex align-items-center justify-content-center-lg"
                    onClick={onLogout}
                  >
                    <FaSignOutAlt className="me-1" />
                    {/* Log Out */}
                  </NavLink>
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
