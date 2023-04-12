import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
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
          newFileNames.push({
            name: fileRef.name.replace(/\.(docx|rtf|mp4)$/i, ""),
            uri: fileRef.toString(),
          });
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
    const stringPath = `/Tutorials${filter}`;
    const listRef = ref(storage, stringPath);

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
            /*
            The replace method takes a regular expression as the first parameter and a replacement string as the second parameter. 
            The regular expression /\.docx$/i matches the string ".docx" only at the end of the string ($) and ignores the case (i flag). 
            The replacement string is an empty string, which effectively removes the ".docx" extension from the string.
            name: itemRef.name.replace(/\.(docx|rtf|mp4)$/i, ""),
            uri: itemRef.toString(),
            */
            name: itemRef.name.replace(/\.(docx|rtf|mp4)$/i, ""),
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
      <div className="spinner-border " role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid mt-3 pb-3">
        <div className="container text-center">
          <h1 className="display-4">Tutorials</h1>
          <p className="lead">
            Guides, updates & examples about the comax pos software
          </p>
        </div>
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

      {isLoading ? (
        <div className="d-flex justify-content-center mt-3">{content}</div>
      ) : (
        <ul>
          <div className="d-flex align-items-center flex-column mt-3">
            {filteredData.map((file) => (
              <TutorialItem
                key={file.name}
                item={file}
                onDownload={() => downloadFileHandler(file.uri)}
                onViewFile={() => showFileHandler(file.uri)}
                uri={file.uri}
              />
            ))}
          </div>
        </ul>
      )}
    </>
  );
};

export default Tutorials;
