import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AllTasks from "../components/Tasks/AllTasks";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Tasks = () => {
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
