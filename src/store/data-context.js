import React from "react";

const DataContext = React.createContext({
  users: [],
  tasks: [],
  addTask: (task) => {},
  // fetchUsers: () => {},
});

export default DataContext;
