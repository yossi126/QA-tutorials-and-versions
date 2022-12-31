import React, { useState, useEffect, useCallback } from "react";
import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const DataContext = React.createContext({
  users: [],
  tasks: [],
  addTask: (task) => {},
  deleteTask: (id) => {},
  loading: false,
  // fetchUsers: () => {},
});

export const DataProvider = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const users = [];
  const tasks = [];
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setAllUsers(users);
    setIsLoading(false);
  };

  const getAllTasks = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "tasks"));

    querySnapshot.forEach((doc) => {
      tasks.push({
        realId: doc.id,
        id: doc.data().id,
        description: doc.data().description,
        priority: doc.data().priority,
      });
    });

    setAllTasks(tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
    getAllTasks();
  }, []);

  const addTask = async (task) => {
    //setAllTasks([...allTasks, task]);

    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getAllTasks();
    //setAllTasks(tasks);
  };

  const deleteTaskHandler = async (id) => {
    // const filteredTasks = allTasks.filter((element) => element.id !== id);
    // setAllTasks(filteredTasks);
    try {
      await deleteDoc(doc(db, "tasks", id));
      getAllTasks();
    } catch (e) {
      console.log(e);
    }
    //onsole.log(id);
  };

  const dataContext = {
    users: allUsers,
    tasks: allTasks,
    addTask: addTask,
    deleteTask: deleteTaskHandler,
    loading: isLoading,
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
