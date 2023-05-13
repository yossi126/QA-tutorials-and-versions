import React, { useState, useEffect } from "react";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataContext = React.createContext({
  users: [],
  versions: [],
  tasks: [],
  loading: false,
  addTask: (task) => {},
  deleteTask: (id) => {},
  editTask: (task) => {},
  uploadImage: (file) => {},
});

export const DataProvider = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allVersions, setAllVersions] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const tasks = [];
  const users = [];
  const [isLoading, setIsLoading] = useState(false);

  //firebase
  const storage = getStorage();

  //creating unique id for the picture name.
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const getAllUsers = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    setAllUsers(users);
    //setIsLoading(false);
  };

  const getAllVersions = async () => {
    //setIsLoading(true);
    const versions = [];
    const querySnapshot = await getDocs(collection(db, "updates"));

    querySnapshot.forEach((doc) => {
      versions.push({
        id: doc.id,
        StorageLocation: doc.data().StorageLocation,
        download: doc.data().download,
        latestUpdate: doc.data().latestUpdate,
        releaseDate: doc.data().releaseDate,
      });
    });
    setAllVersions(versions);
    //setIsLoading(false);
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
        userName: doc.data().userName,
        description: doc.data().description,
        priority: doc.data().priority,
        timestamp: doc.data().timestamp,
        img: doc.data().img,
      });
    });

    setAllTasks(tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllUsers();
    getAllVersions();
    getAllTasks();
  }, []);

  const addTask = async (task, file) => {
    try {
      // creating the doc
      const docRef = await addDoc(collection(db, "tasks"), task);
      //console.log("Document written with ID: ", docRef.id);

      //uploading image and then update the doc again with the field - img
      uploadImage(file, docRef);

      //toast notification
      toast.success(`Task added`, {
        position: "bottom-center",
        autoClose: 1000,
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

  const uploadImage = (file, docRef) => {
    const storageRef = ref(storage, "images/" + file.name + small_id);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log("File available at", downloadURL);
          //for the doc to have the image url
          updateDoc(docRef, {
            img: downloadURL,
          });
        });
      }
    );
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));

      toast.warn("Task deleted", {
        position: "bottom-center",
        autoClose: 1000,
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
        position: "bottom-center",
        autoClose: 1000,
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
    versions: allVersions,
    tasks: allTasks,
    loading: isLoading,
    addTask: addTask,
    deleteTask: deleteTaskHandler,
    editTask: editTask,
    uploadImage: uploadImage,
  };
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
