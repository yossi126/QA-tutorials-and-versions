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
      {/* <header class="p-3 text-bg-dark">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <h3>COMAX QA</h3>
            <ul
              class={`${styles.nav} col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 `}
            >
              {authCtx.user && (
                <li>
                  <NavLink to="/updates" className="nav-link px-3 ">
                    <svg
                      class="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      {" "}
                      <path d="M11.5 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5Zm2 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5Zm-10 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6ZM5 3a1 1 0 0 0-1 1h-.5a.5.5 0 0 0 0 1H4v1h-.5a.5.5 0 0 0 0 1H4a1 1 0 0 0 1 1v.5a.5.5 0 0 0 1 0V8h1v.5a.5.5 0 0 0 1 0V8a1 1 0 0 0 1-1h.5a.5.5 0 0 0 0-1H9V5h.5a.5.5 0 0 0 0-1H9a1 1 0 0 0-1-1v-.5a.5.5 0 0 0-1 0V3H6v-.5a.5.5 0 0 0-1 0V3Zm0 1h3v3H5V4Zm6.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2Z" />
                      <path d="M1 2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 9H1V8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6H1V5H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 2H1Zm1 11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11Z" />
                    </svg>
                    POS Versions
                  </NavLink>
                </li>
              )}

              {authCtx.user && (
                <li>
                  <NavLink to="/tutorials" className="nav-link px-3">
                    <svg
                      class="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      {" "}
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                    </svg>
                    Tutorials
                  </NavLink>
                </li>
              )}

              {authCtx.user && (
                <li>
                  <NavLink to="/tasks" className="nav-link px-3">
                    <svg
                      class="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      {" "}
                      <path
                        fill-rule="evenodd"
                        d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                      />
                      <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                      <path
                        fill-rule="evenodd"
                        d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                      />
                    </svg>
                    Tasks
                  </NavLink>
                </li>
              )}
            </ul>
            {authCtx.user && (
              <div>
                <NavLink to="/profile">
                  <button type="button" class="btn btn-outline-light me-2">
                    <CgProfile size={25} />
                  </button>
                </NavLink>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  onClick={logoutHandler}
                >
                  <MdExitToApp size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header> */}

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
                <Nav.Link as={NavLink} to="/tasks">
                  Tasks
                </Nav.Link>
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
