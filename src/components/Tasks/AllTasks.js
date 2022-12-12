import React, { Fragment, useContext } from "react";
import Table from "react-bootstrap/Table";
import DataContext from "../../store/data-context";

const AllTasks = () => {
  const dataCtx = useContext(DataContext);

  return (
    <Fragment>
      <h1>all task</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>description</th>
            <th>priority</th>
          </tr>
        </thead>
        <tbody>
          {dataCtx.tasks.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.description}</td>
              <td>{element.priority}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default AllTasks;
