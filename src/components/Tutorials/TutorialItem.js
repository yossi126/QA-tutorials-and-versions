import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { FiDownload } from "react-icons/fi";
import { SlEyeglass } from "react-icons/sl";
import { FiMail } from "react-icons/fi";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TutorialItem = (props) => {
  //firebase
  const storage = getStorage();
  const [downloadUrl, setDownloadUrl] = useState("");
  const authCtx = useContext(AuthContext);
  const [file, setFile] = useState("");

  useEffect(() => {
    const gsReference = ref(storage, props.uri);
    getDownloadURL(gsReference).then((url) => {
      setDownloadUrl(url);
    });
  }, [storage, props.uri]);

  const emailHandler = () => {
    const subject = props.item.name;
    const body = downloadUrl;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=Download link: ${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    window.open(mailtoLink);
  };

  const updateFileHandler = (event) => {
    event.preventDefault();
    const gsReference = ref(storage, props.uri);
    // Delete the file
    deleteObject(gsReference)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error.message);
      });
    //Update the file
    //const storageRef = ref(storage, "/Tutorials/hardware/" + file.name);
    const storageRef = ref(storage, `/${props.fullPath}/` + file.name);

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

  const deleteFileHandler = () => {
    const id = toast.loading("Please wait...", {
      position: "top-right",
    });
    const gsReference = ref(storage, props.uri);
    // Delete the file
    deleteObject(gsReference)
      .then(() => {
        // File deleted successfully
        toast.update(id, {
          render: "File deleted successfully.",
          type: "success",
          pposition: "top-right",
          isLoading: false,
          autoClose: 2500,
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error.message);
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
    <>
      <div className="p-2">
        <div className="card text-end mt-1 border-top-0 border-end-0 border-start-0 border-3">
          <div className="card-body ">
            {/* text from right to left usin the dir. 
            The dir attribute specifies the base direction of text, either right-to-left or left-to-right.*/}
            <h5 className="card-title text-center" dir="rtl">
              {props.item.name}
            </h5>
            <div className="container d-flex justify-content-center">
              {authCtx.user.email === "yossi126@gmail.com" ? (
                <button
                  className="me-2 btn btn-outline-danger btn-lg"
                  onClick={deleteFileHandler}
                >
                  <RiDeleteBin6Line size={25} />
                </button>
              ) : null}
              {authCtx.user.email === "yossi126@gmail.com" ? (
                <button
                  className="me-2 btn btn-light btn-lg"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <GrUpdate size={25} />
                </button>
              ) : null}
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={props.onDownload}
              >
                <FiDownload size={25} />
              </button>
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={props.onViewFile}
              >
                <SlEyeglass size={25} />
              </button>
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={emailHandler}
              >
                <FiMail size={25} />
              </button>
            </div>
          </div>
        </div>
        {/* modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update tutorial
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <form onSubmit={updateFileHandler}>
                    <div class="mb-3">
                      <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile02"
                        onChange={(event) => setFile(event.target.files[0])}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <button className="btn btn-primary" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    document.getElementById("inputGroupFile02").value = "";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialItem;
