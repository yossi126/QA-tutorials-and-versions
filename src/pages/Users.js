import React, { useContext } from "react";
import DataContext from "../store/data-context";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const Users = () => {
  const dataCtx = useContext(DataContext);
  //console.log(dataCtx.users);
  // const myArray = [{ x: 100 }, { x: 200 }, { x: 300 }];
  // const newArray = myArray.map((element) => element.x);
  // console.log(newArray); // [100, 200, 300]

  // const myArray2 = dataCtx.users.map((element) => element.name);
  // console.log(dataCtx.users.map((element) => element.name));
  return (
    <Container>
      {dataCtx.loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {dataCtx.users.map((element) => (
              <tr key={element.uid}>
                <td>{element.uid}</td>
                <td>{element.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Users;
