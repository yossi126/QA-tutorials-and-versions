import React, { Fragment, useContext, useState } from "react";
import Model from "../UI/Model";
import TaskFilter from "./TaskFilter";
//bootstrap
import Table from "react-bootstrap/Table";
import DataContext from "../../store/data-context";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { default as ImgModal } from "react-bootstrap/Modal";
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icons
import { BsFillTrashFill, BsFillEyeFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

const AllTasks = () => {
  const dataCtx = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [tempImgUrl, setTempImgUrl] = useState("");
  const [element, setElement] = useState({});
  const handleClose = () => setShow(false);
  const [filteredPriorty, setFilteredPriorty] = useState("");

  const handleShow = (element) => {
    setElement(element);
    setShow(true);
  };

  const ImgModalHandler = (url) => {
    setShowImgModal(true);
    setTempImgUrl(url);
  };

  const handelEdit = (id, description, priority) => {
    dataCtx.editTask(id, description, priority);
  };

  const handleDeleteBtn = (id) => {
    dataCtx.deleteTask(id);
  };

  const filterChangeHandler = (selectedPriorty) => {
    setFilteredPriorty(selectedPriorty);
  };
  // const filteredTasks = dataCtx.tasks.filter((task) => {
  //   if (filteredPriorty === "") {
  //     return dataCtx.tasks;
  //   }
  //   return task.priority === filteredPriorty;
  // });

  const filteredTasks = dataCtx.tasks.filter(
    (task) => task.priority.includes(filteredPriorty) || filteredPriorty === ""
  );

  return (
    <Fragment>
      <h1 className="display-3">All tasks</h1>
      <TaskFilter onChangeFilter={filterChangeHandler}></TaskFilter>
      {dataCtx.loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table responsive="md">
            <thead>
              <tr className="table-light">
                {/* <th>#</th> */}
                <th>Description</th>
                <th>Priority</th>
                <th>Date created</th>
                <th>Status</th>
                <th>Created by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((element) => (
                <tr key={element.realId}>
                  {/* <td>{element.id}</td> */}
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
                  <td>{element.userName}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => ImgModalHandler(element.img)}
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
                    </Button>
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
          <ImgModal
            size="md"
            centered
            show={showImgModal}
            onHide={() => setShowImgModal(false)}
          >
            <img className="full-image" alt="uploaded img" src={tempImgUrl} />
          </ImgModal>
        </>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default AllTasks;
