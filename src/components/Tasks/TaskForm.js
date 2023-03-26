import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataContext from "../../store/data-context";
import AuthContext from "../../store/auth-context";
//firebase
import { serverTimestamp } from "firebase/firestore";

const TaskForm = (props) => {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("High");
  const [file, setFile] = useState("");
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const dropdownPriorityHandler = (event) => {
    setEnteredPriority(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const cancelBtnHandler = () => {
    history.replace("/tasks");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //get the current user name
    let username = "";
    dataCtx.users.forEach((element) => {
      if (element.uid === authCtx.user.uid) {
        username = element.name;
      }
    });

    const data = {
      userName: username,
      description: enteredDescription,
      priority: enteredPriority,
      timestamp: serverTimestamp(),
      img: file.name,
    };

    dataCtx.addTask(data, file);
    history.replace("/tasks");
    setEnteredDescription("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload image </Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={cancelBtnHandler}>
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskForm;
