import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTutorial = () => {
  const [file, setFile] = useState("");
  const [enteredPath, setEnteredPath] = useState("/Tutorials/hardware");
  const history = useHistory();

  //firebase
  const storage = getStorage();

  const dropdownPriorityHandler = (event) => {
    setEnteredPath(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const storageRef = ref(storage, `${enteredPath}/` + file.name);

    const id = toast.loading("Please wait...", {
      position: "top-right",
    });

    uploadBytes(storageRef, file)
      .then(() => {
        console.log("File uploaded successfully.");
        toast.update(id, {
          render: "File uploaded successfully.",
          type: "success",
          pposition: "top-right",
          isLoading: false,
          autoClose: 1500,
        });
        history.replace("/profile");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);

        toast.update(id, {
          render: error,
          type: "error",
          position: "top-right",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="container">
      <h1 className="display-6"> Add a tutorial</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            className="form-control"
            type="file"
            required
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <div>
          <select className="form-select" onChange={dropdownPriorityHandler}>
            <option defaultValue="/Tutorials/hardware">Hardware</option>
            <option value="/Tutorials/pos">Pos</option>
            <option value="/Tutorials/selfpos">Selfpos</option>
          </select>
        </div>
        <div>
          <button type="submit" className="mt-2 btn btn-dark">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutorial;
