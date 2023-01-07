import React, { Fragment, useContext, useState } from "react";
import Model from "../UI/Model";
//bootstrap
import Table from "react-bootstrap/Table";
import DataContext from "../../store/data-context";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icons
import { BsFillTrashFill, BsFillEyeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { BsCloudUploadFill } from "react-icons/bs";

const AllTasks = () => {
  const dataCtx = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [element, setElement] = useState({});
  const handleClose = () => setShow(false);

  const handleShow = (element) => {
    setElement(element);
    setShow(true);
  };

  const handelEdit = (id, description, priority) => {
    dataCtx.editTask(id, description, priority);
  };

  const handleDeleteBtn = (id) => {
    dataCtx.deleteTask(id);
  };

  return (
    <Fragment>
      <h1 className="display-3">All tasks</h1>
      {dataCtx.loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Date created</th>
                <th>Status</th>
                <th>Handler</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataCtx.tasks.map((element) => (
                <tr key={element.realId}>
                  <td>{element.id}</td>
                  <td>{element.description}</td>
                  <td>
                    {element.priority === "High" && (
                      <Badge bg="danger">{element.priority}</Badge>
                    )}
                    {element.priority === "Mid" && (
                      <Badge bg="warning">{element.priority}</Badge>
                    )}
                    {element.priority === "Low" && (
                      <Badge bg="secondary">{element.priority}</Badge>
                    )}
                  </td>
                  <td>{element.timestamp.toDate().toDateString()}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        console.log(element.timestamp.toDate().toDateString());
                      }}
                    >
                      <BsFillEyeFill />
                    </Button>{" "}
                    <Button
                      variant="primary"
                      onClick={() => handleShow(element)}
                    >
                      <FaRegEdit />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDeleteBtn(element.realId);
                      }}
                    >
                      <BsFillTrashFill />
                    </Button>{" "}
                    <Button variant="dark">
                      <BsCloudUploadFill />
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Model
            isShow={show}
            content={element}
            handleClose={handleClose}
            onChangeData={handelEdit}
          />
        </>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default AllTasks;

/**
 Date.prototype.toString ( )
 Date.prototype.toDateString ( )
 Date.prototype.toTimeString ( )
 Date.prototype.toLocaleString ( )
 Date.prototype.toLocaleDateString ( )
 Date.prototype.toLocaleTimeString ( )
 */
