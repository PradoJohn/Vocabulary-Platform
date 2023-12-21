import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { api } from "../utilities";
import { Navbar, Container, Nav, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TbVocabulary, TbPremiumRights  } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import './Header.css';
import Logo from '../assets/WordFinityLogo.png';
import { IoOptionsOutline } from "react-icons/io5";
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
      <Navbar expand="lg" className="bg-body-tertiary p-1" >
        <Container>
            <Navbar.Brand as={Link} to="/"><img src={Logo} id="logo"/></Navbar.Brand>
              {user ? (
                  <>
                    <Nav className="links align-items-center" variant="underline">
                      <Nav.Link as={Link} to="/demo/" >
                        <IoSearch size={30} />
                        <p className="d-none d-md-inline">Search</p>
                        </Nav.Link>
                      <Nav.Link as={Link} to="/collection/">
                        <TbVocabulary size={35} className="d-md-none"/>
                        <p className="d-none d-md-inline">Collections</p>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/premium_shop/">
                        {isPremium ? (
                        <>
                        <IoOptionsOutline size={35} className="d-md-none"/>
                        <p className="d-none d-md-inline">Options</p>
                        </>
                        ) : null}
                      </Nav.Link>
                    </Nav>
                    <div className="navbar-nav">  
                      <DropdownButton
                        as={ButtonGroup}
                        key="start"
                        className={"custom-dropdown"}
                        drop="start"
                        variant="transparent"
                        title={ 
                          <span>
                            <FaRegUserCircle size={30} className="d-md-none" /> {/* Hide on medium and larger screens */}
                            <span className="d-none d-md-inline"><strong>{user}</strong></span> {/* Hide on small screens */}
                          </span>
                        }
                      >
                        <Dropdown.Item as={Link} to="/account/" className="d-flex flex-row align-items-center"> 
                          <MdManageAccounts size={25}/><div className="px-1">Account</div>
                          </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings/" className="d-flex flex-row align-items-center"> 
                          <CiSettings size={25}/> <div className="px-1">Settings</div>
                          </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout} style={{color:"red"}}>Log out</Dropdown.Item>
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
