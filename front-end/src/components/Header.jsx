import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utilities";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Header.css';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("users/logout/");
      if (response.status === 204) {
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/register/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <div className="nav-container">
          <div>
            <Navbar.Brand as={Link} to="/">WordVibe</Navbar.Brand>
          </div>
              {user ? (
                  <div className="navbar-nav">
                    <div className="demo-link">
                    <Nav.Link as={Link} to="/demo/">Demo</Nav.Link>
                    </div>
                    <NavDropdown title={user} id="basic-nav-dropdown" className="custom-dropdown">
                      <NavDropdown.Item as={Link} to="/account/">Account</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/settings/">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </div>
              ) : (
                <Nav.Link as={Link} to="/register/">Login</Nav.Link>
              )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
