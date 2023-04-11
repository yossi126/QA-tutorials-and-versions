import React, { useState, useRef, useContext, useReducer } from "react";
import AuthContext from "../../store/auth-context";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ResetModal from "./ResetModal";

const authFormReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT": {
      return { ...state, email: action.value };
    }
    case "NAME_INPUT": {
      return { ...state, name: action.value };
    }
    case "PASSWORD_INPUT": {
      return { ...state, password: action.value };
    }
  }
  throw Error("Unknown action: " + action.type);
};

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const [authFormState, dispatchAuthFormState] = useReducer(authFormReducer, {
    name: "",
    email: "",
    password: "",
  });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submmitHandler = (event) => {
    event.preventDefault();

    if (isLogin) {
      authCtx.login(authFormState.email, authFormState.password);
    } else {
      authCtx.singup(
        authFormState.name,
        authFormState.email,
        authFormState.password
      );
    }
  };

  const nameChangeHandler = () => {
    dispatchAuthFormState({
      type: "NAME_INPUT",
      value: nameInputRef.current.value,
    });
  };

  const emailChangeHandler = () => {
    dispatchAuthFormState({
      type: "EMAIL_INPUT",
      value: emailInputRef.current.value,
    });
    /* 
    const action = { type: "EMAIL_INPUT", value: emailInputRef.current.value };
    const nextState = authFormReducer(authFormState, action);
    //console.log(authFormState); // { age: 42 }
    console.log(nextState); // { age: 43 }
    */
  };

  const passwordChangeHandler = () => {
    dispatchAuthFormState({
      type: "PASSWORD_INPUT",
      value: passwordInputRef.current.value,
    });
  };

  let showRememberMe = (
    <Form.Group
      className="mt-3 d-flex justify-content-center"
      controlId="formBasicCheckbox"
    >
      <Form.Check
        type="checkbox"
        label="Remember me"
        onChange={() => {
          console.log("first");
        }}
      />
    </Form.Group>
  );

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
                  onChange={nameChangeHandler}
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
                onChange={emailChangeHandler}
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
                onChange={passwordChangeHandler}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="light" type="submit">
                {isLogin ? "Login" : "Create Account"}
              </Button>
            </div>
            {isLogin && showRememberMe}
            <div className="mt-1 d-flex flex-column ">
              <Button variant="dark" onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Forgot password?
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ResetModal />
    </Container>
  );
};

export default AuthForm;
