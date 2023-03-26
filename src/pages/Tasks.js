import React from "react";
import { Link } from "react-router-dom";
import AllTasks from "../components/Tasks/AllTasks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { VscAdd } from "react-icons/vsc";

const Tasks = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          {" "}
          <Button as={Link} to="/tasks/new-task">
            <VscAdd />
          </Button>
        </Col>
        {/* <Col>2 of 3</Col>
        <Col>3 of 3</Col> */}
      </Row>
      <Row className="mt-5">
        <AllTasks />
      </Row>
    </Container>
  );
};

export default Tasks;
