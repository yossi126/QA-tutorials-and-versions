import React from "react";
import { FiDownload } from "react-icons/fi";
import { SlEyeglass } from "react-icons/sl";

const VersionItem = (props) => {
  const downloadFileHandler = () => {
    window.open(props.download);
  };
  const watchFileHandler = () => {
    const url = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
      props.download
    )}`;
    window.open(url);
  };
  return (
    <div className="p-3">
      <div className="card text-center">
        <div className="card-header">
          <h1>{props.id}</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Release date:{" "}
            {props.releaseDate.toDate().toLocaleDateString("en-GB")}
          </h5>
          <p>
            <strong>New features</strong>
          </p>
          <p>
            <strong>Bug Fixes</strong>
          </p>

          <button
            type="button"
            className="me-2 btn btn-light btn-lg"
            onClick={watchFileHandler}
          >
            <SlEyeglass />
          </button>
          <button
            type="button"
            className="me-2 btn btn-light btn-lg"
            onClick={downloadFileHandler}
          >
            <FiDownload />
          </button>
        </div>
        <div className="card-footer text-body-secondary">
          Latest update:{" "}
          {props.latestUpdate.toDate().toLocaleDateString("en-GB")}
        </div>
      </div>
    </div>
  );
};

export default VersionItem;
