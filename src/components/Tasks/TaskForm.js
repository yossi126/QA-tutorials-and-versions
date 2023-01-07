import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import DataContext from "../../store/data-context";
import { serverTimestamp } from "firebase/firestore";

const TaskForm = (props) => {
  const [enteredId, setEnteredId] = useState("");
  const [enteredIdIsValid, setEnteredIdIsValid] = useState(true);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("High");
  const dataCtx = useContext(DataContext);
  const history = useHistory();

  const dropdownPriorityHandler = (event) => {
    setEnteredPriority(event.target.value);
  };

  const idChangeHandler = (event) => {
    setEnteredIdIsValid(true);
    setEnteredId(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredId.trim().length !== 6) {
      setEnteredIdIsValid(false);
      return;
    }
    setEnteredIdIsValid(true);

    const data = {
      id: enteredId,
      description: enteredDescription,
      priority: enteredPriority,
      timestamp: serverTimestamp(),
    };

    dataCtx.addTask(data);
    history.replace("/tasks");
    setEnteredId("");
    setEnteredDescription("");
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={enteredId}
                type="text"
                placeholder="ID"
                onChange={idChangeHandler}
                required
              />
              {!enteredIdIsValid && (
                <Alert variant="danger">ID must be 6 characters long</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={enteredDescription}
                as="textarea"
                placeholder="Description"
                onChange={descriptionChangeHandler}
                rows={3}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select onChange={dropdownPriorityHandler}>
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskForm;
