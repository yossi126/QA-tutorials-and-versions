import React, { useState, useEffect, useCallback } from "react";
import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataContext = React.createContext({
  users: [],
  tasks: [],
  addTask: (task) => {},
  deleteTask: (id) => {},
  editTask: (task) => {},
  loading: false,
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
    const collectionRef = collection(db, "tasks");
    const querySnapshot = await getDocs(
      query(collectionRef, orderBy("timestamp", "desc"))
    );

    querySnapshot.forEach((doc) => {
      tasks.push({
        realId: doc.id,
        id: doc.data().id,
        description: doc.data().description,
        priority: doc.data().priority,
        //->
        timestamp: doc.data().timestamp,
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
    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      console.log("Document written with ID: ", docRef.id);

      //toast notification
      toast.success(`Task ${task.id} added`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getAllTasks();
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));

      toast.warn("Task deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getAllTasks();
    } catch (e) {
      console.log(e);
    }
  };

  const editTask = async (id, description, priority) => {
    const docRef = doc(db, "tasks", id);
    try {
      await updateDoc(docRef, {
        description: description,
        priority: priority,
      });
      toast.success(`Task ${id} updated`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getAllTasks();
    } catch (e) {
      console.log(e);
    }
  };

  const dataContext = {
    users: allUsers,
    tasks: allTasks,
    addTask: addTask,
    deleteTask: deleteTaskHandler,
    editTask: editTask,
    loading: isLoading,
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
