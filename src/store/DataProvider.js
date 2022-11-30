import React, { useState } from "react";
import DataContext from "./data-context";
import usersData from "../data/users.js";

const DataProvider = (props) => {
  const [allUsers, setAllUsers] = useState(usersData);

  //console.log(allUsers.map());

  const dataContext = {
    users: allUsers,
    missions: [],
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
