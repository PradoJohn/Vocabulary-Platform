import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { api } from "../utilities";
import { Navbar, Container, Nav, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TbVocabulary, TbPremiumRights  } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import './Header.css';
import Logo from '../assets/WordFinityLogo.png'
const Header = ({ user, setUser, isPremium }) => {
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
      <Navbar expand="lg" className="bg-body-tertiary p-1">
        <Container>
            <Navbar.Brand as={Link} to="/"><img src={Logo} id="logo"/></Navbar.Brand>
              {user ? (
                  <>
                    <div className="links align-items-center">
                      <Nav.Link as={Link} to="/demo/"><IoSearch size={35} /></Nav.Link>
                      <Nav.Link as={Link} to="/collection/">
                        {isPremium ? <TbVocabulary size={35} /> : null}
                      </Nav.Link>
                      <Nav.Link as={Link} to="/premium_shop/">
                        {isPremium ? <TbPremiumRights size={35}/> : null}
                      </Nav.Link>
                    </div>
                    <div className="navbar-nav">  
                      <DropdownButton
                        as={ButtonGroup}
                        key="start"
                        className={"custom-dropdown"}
                        drop="start"
                        variant="transparent"
                        title={ 
                          <strong style={{fontSize:"18px"}}>
                            <FaRegUserCircle size={30}/>
                          </strong>
                        }
                      >
                        <Dropdown.Item as={Link} to="/account/">Account</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings/">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </>
              ) : (
                <Nav.Link as={Link} to="/register/">Login</Nav.Link>
              )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
