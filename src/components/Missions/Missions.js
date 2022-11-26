import React from "react";
import MissionForm from "./MissionForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Missions = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <MissionForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Missions;
