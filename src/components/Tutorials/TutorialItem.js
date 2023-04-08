import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FiDownload } from "react-icons/fi";
import { SlEyeglass } from "react-icons/sl";
import { FiMail } from "react-icons/fi";

const TutorialItem = (props) => {
  //firebase
  const storage = getStorage();

  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const gsReference = ref(storage, props.uri);
    getDownloadURL(gsReference).then((url) => {
      setDownloadUrl(url);
    });
  }, []);

  const emailHandler = () => {
    const subject = props.item.name;
    const body = downloadUrl;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    window.open(mailtoLink);
  };

  return (
    <div className="card text-end mt-1">
      <div className="card-body">
        <h5 className="card-title">{props.item.name}</h5>
        <a className="me-2 btn btn-light" onClick={props.onDownload}>
          <FiDownload />
        </a>
        <a className="me-2 btn btn-light" onClick={props.onViewFile}>
          <SlEyeglass />
        </a>
        <button className="me-2 btn btn-primary" onClick={emailHandler}>
          <FiMail />
        </button>
      </div>
    </div>
  );
};

export default TutorialItem;
