import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>QA</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {authCtx.user && (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tasks">
                  Tasks
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tutorials">
                  Tutorials
                </Nav.Link>
              </Nav>
            )}

            {authCtx.user && (
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <header className={styles.header}>
        <div className={styles.logo}>QA</div>
        <nav>
          <ul>
            {authCtx.user && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {authCtx.user && (
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
            )}
            {authCtx.user && (
              <li>
                <Link to="/users">Users</Link>
              </li>
            )}
            {authCtx.user && (
              <li>
                <Link to="/tutorials">Tutorials</Link>
              </li>
            )}
            {authCtx.user && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {authCtx.user && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header> */}
    </>
  );
};

export default MainNavigation;
