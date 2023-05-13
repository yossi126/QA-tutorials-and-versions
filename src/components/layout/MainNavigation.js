import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { MdExitToApp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h4>COMAX QA</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {authCtx.user && (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/updates">
                  POS versions
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tutorials">
                  Tutorials
                </Nav.Link>
                {/* <Nav.Link as={NavLink} to="/tasks">
                  Tasks
                </Nav.Link> */}
              </Nav>
            )}

            {authCtx.user && (
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/profile">
                  <CgProfile size={30} />
                </Nav.Link>
                <Nav.Link onClick={logoutHandler}>
                  <MdExitToApp size={30} />
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavigation;
