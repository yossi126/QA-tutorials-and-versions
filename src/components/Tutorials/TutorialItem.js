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

  return (
    <>
      <div className="p-2">
        <div className="card text-end mt-1 border-top-0 border-end-0 border-start-0 border-3">
          <div className="card-body ">
            <h5 className="card-title text-center">{props.item.name}</h5>
            <div className="container d-flex justify-content-center">
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={props.onDownload}
              >
                <FiDownload />
              </button>
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={props.onViewFile}
              >
                <SlEyeglass />
              </button>
              <button
                className="me-2 btn btn-light btn-lg"
                onClick={emailHandler}
              >
                <FiMail />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialItem;
