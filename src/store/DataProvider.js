import React, { useState, useEffect } from "react";
import DataContext from "./data-context";
import { usersData, taskData } from "../data/data.js";

const DataProvider = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  // const fetchUsers = async () => {
  //   const response = await fetch("http://localhost:8080/users/get");

  //   if (!response.ok) {
  //     throw new Error("Something went wrong");
  //   }

  //   const responseData = await response.json();
  //   setAllUsers(responseData);
  //   console.log(responseData);
  // };

  useEffect(() => {
    setAllUsers(usersData);
    setAllTasks(taskData);
  }, []);
  //useEffect(() => {}, [allUsers]);
  //console.log(allUsers.map());

  const addTask = (task) => {
    setAllTasks([...allTasks, task]);
    console.log(allTasks);
  };

  const dataContext = {
    users: allUsers,
    tasks: allTasks,
    addTask: addTask,
    //fetchUsers: fetchUsers,
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
