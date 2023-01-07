import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Model = (props) => {
  const decriptionInputRef = useRef();
  const priorityInputRef = useRef();

  const filteredPriority = ["High", "Mid", "Low"].filter(
    (el) => el !== props.content.priority
  );

  const handleSubmmit = (event) => {
    event.preventDefault();

    const enteredDescription = decriptionInputRef.current.value;
    const enteredPriotiry = priorityInputRef.current.value;

    props.onChangeData(
      props.content.realId,
      enteredDescription,
      enteredPriotiry
    );
  };

  return (
    <>
      <Modal show={props.isShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.content.realId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmmit} id="form">
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={props.content.description}
                ref={decriptionInputRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select className="mb-3" ref={priorityInputRef}>
                <option>{props.content.priority}</option>
                {filteredPriority.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={props.handleClose}
            type="submit"
            form="form"
          >
            Update
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Model;
