import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AllTasks from "../components/Tasks/AllTasks";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Tasks = () => {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn);
  //console.log(authCtx.user);
  return (
    <Container>
      <Row className="mt-5">
        <Button as={Link} to="/tasks/new-task">
          Add New Task
        </Button>
      </Row>
      <Row className="mt-5">
        <AllTasks />
      </Row>
    </Container>
  );
};

export default Tasks;
