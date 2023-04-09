import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
//import styles from "./Tutorials.module.css";
import TutorialItem from "../components/Tutorials/TutorialItem";

const Tutorials = (props) => {
  // array of obj
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //firebase
  const storage = getStorage();
  // referance to the main path of the tutorials
  const listRef = ref(storage, `/Tutorials`);

  useEffect(() => {
    setIsLoading(true);
    listAllFiles(listRef).finally(() => setIsLoading(false));
  }, [storage]);

  const listAllFiles = (listRef) => {
    let newFileNames = [];
    return listAll(listRef)
      .then((result) => {
        result.items.forEach((fileRef) => {
          newFileNames.push({ name: fileRef.name, uri: fileRef.toString() });
        });
        // Iterate through the list of prefixes using a foreach loop
        result.prefixes.forEach((prefixRef) => {
          // Recursively call the same function on the new prefixRef
          // Tutorials/hardware
          // Tutorials/pos
          // Tutorials/selfpos
          listAllFiles(prefixRef).then((subFiles) => {
            newFileNames.push(...subFiles);
          });
        });
        setData((prevdata) => [...prevdata, ...newFileNames]);
        return newFileNames;
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
        return [];
      });
  };

  const filterChangeHandler = (filter) => {
    const loadedData = [];
    const stringPatch = `/Tutorials${filter}`;
    const listRef = ref(storage, stringPatch);

    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          listAllFiles(folderRef);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          // uri is the reference from a Google Cloud Storage URI
          loadedData.push({
            name: itemRef.name,
            uri: itemRef.toString(),
          });
        });
        setData(loadedData);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  const downloadFileHandler = (uri) => {
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, uri);
    // Get the download URL
    getDownloadURL(gsReference).then((url) => {
      window.open(url, "_blank");
    });
  };

  const showFileHandler = (uri) => {
    const gsReference = ref(storage, uri);
    getDownloadURL(gsReference).then((url) => {
      const view = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
        url
      )}`;
      window.open(view, "_blank");
    });
  };

  let searchInputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = data.filter((file) => {
    if (inputText === "") {
      return file;
    } else {
      return file.name.toLowerCase().includes(inputText);
    }
  });

  let content;
  if (isLoading) {
    content = (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex p-2 justify-content-center">
        <h1 class="display-4">Tutorials</h1>
      </div>
      <div className="d-flex justify-content-center">
        <input
          type="search"
          className="form-control w-25"
          placeholder="Type to search..."
          onChange={searchInputHandler}
        />
      </div>
      <div className="d-flex justify-content-center ">
        <select
          className="form-select w-25 mt-2 mb-2"
          aria-label="Default select example"
          onChange={(e) => filterChangeHandler(e.target.value)}
        >
          <option value="">All</option>
          <option value="/hardware">Hardware</option>
          <option value="/pos">Pos</option>
          <option value="/selfpos">Self-pos</option>
        </select>
      </div>
      <div className="d-flex p-2 justify-content-center">
        {isLoading ? (
          content
        ) : (
          <ul>
            {filteredData.map((file) => (
              <TutorialItem
                key={file.name}
                item={file}
                onDownload={() => downloadFileHandler(file.uri)}
                onViewFile={() => showFileHandler(file.uri)}
                uri={file.uri}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Tutorials;
