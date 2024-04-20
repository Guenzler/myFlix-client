import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./nav-styles.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
    navigate('/');
  };

  const resetInputField = () => {
    setSearchTerm('');
    onSearch('');
  };

  const resetSearchTerm = () => {
    // Reset search results when user clicks on movie and profile link
    onSearch('');
  };

  return (
    <Navbar expand="lg" className="nav-colors" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="app-icon">Movie App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <span className="navigation">Login</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <span className="navigation">Signup</span>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={resetSearchTerm}>
                  <span className="navigation">Movies</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" onClick={resetSearchTerm}>
                  <span className="navigation">Profile</span>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <span className="navigation">Logout</span>
                </Nav.Link>

              </>
            )}
          </Nav>
          {user && (
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                variant="info"
                type="button"
                onClick={handleSearchSubmit}
              >
                Search
              </Button>
              <Button
                variant="outline-info"
                type="button"
                className="ms-2"
                onClick={resetInputField}
              >
                Reset
              </Button>
            </form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func,
  onSearch: PropTypes.func
}