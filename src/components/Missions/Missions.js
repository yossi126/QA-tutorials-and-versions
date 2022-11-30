import React, { useContext } from "react";
import MissionForm from "./MissionForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataContext from "../../store/data-context";
import Table from "react-bootstrap/Table";

const Missions = () => {
  const dataCtx = useContext(DataContext);

  // const myArray = [{ x: 100 }, { x: 200 }, { x: 300 }];
  // const newArray = myArray.map((element) => element.x);
  // console.log(newArray); // [100, 200, 300]

  // const myArray2 = dataCtx.users.map((element) => element.name);
  // console.log(dataCtx.users.map((element) => element.name));

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <MissionForm />
        </Col>
      </Row>
      <Row className="mt-5">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
            </tr>
          </thead>
          <tbody>
            {dataCtx.users.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Missions;
