import React from "react";
import Form from "react-bootstrap/Form";

function TaskFilter(props) {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  return (
    <>
      <Form.Label>Choose priority:</Form.Label>
      <Form.Text id="passwordHelpBlock" muted>
        Choose priority:
      </Form.Text>
      <Form.Select
        aria-label="Default select example"
        onChange={dropdownChangeHandler}
      >
        <option value="">All prioritys</option>
        <option value="Low">Low</option>
        <option value="Mid">Mid</option>
        <option value="High">High</option>
      </Form.Select>
    </>
  );
}

export default TaskFilter;
