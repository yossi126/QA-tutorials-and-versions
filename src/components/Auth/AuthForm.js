import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      authCtx.login(enteredEmail, enteredPassword);
    } else {
      const enteredName = nameInputRef.current.value;
      authCtx.singup(enteredName, enteredEmail, enteredPassword);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "25rem" }} bg="dark" text="white">
        <Card.Body>
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          <Form onSubmit={submmitHandler}>
            {!isLogin && (
              <Form.Group
                className="mb-3 text-center"
                controlId="formGroupName"
              >
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  ref={nameInputRef}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3 text-center" controlId="formGroupEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailInputRef}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 text-center"
              controlId="formGroupPassword"
            >
              <Form.Label>Your Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="light" type="submit">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <Button variant="dark" onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
