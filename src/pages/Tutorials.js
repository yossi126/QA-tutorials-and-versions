import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import styles from "./Tutorials.module.css";

const Tutorials = (props) => {
  // array of obj
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  //check about prv state
  const [filterpath, setFilter] = useState("");

  //firebase
  const storage = getStorage();

  useEffect(() => {
    const listRef = ref(storage, `/Tutorials`);
    listAllFiles(listRef);
  }, []);

  function listAllFiles(listRef) {
    let newFileNames = [];
    listAll(listRef)
      .then(function (result) {
        // Iterate through the list of files using a foreach loop
        result.items.forEach(function (fileRef) {
          newFileNames.push({ name: fileRef.name, uri: fileRef.toString() });
        });
        // Iterate through the list of prefixes using a foreach loop
        result.prefixes.forEach(function (prefixRef) {
          // Recursively call the same function on the new prefixRef
          listAllFiles(prefixRef);
        });
        setData((prevdata) => [...prevdata, ...newFileNames]);
      })
      .catch(function (error) {
        // Handle any errors that occur
        console.error(error);
      });
  }

  const filterChangeHandler = (filter) => {
    //check about prv state
    //setFilter(filter);
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
          // gs is the reference from a Google Cloud Storage URI
          loadedData.push({ name: itemRef.name, uri: itemRef.toString() });
          // TO DO
          // try making the file object stright from here
          /*
          const itemRefGs = itemRef.toString();
          const gsReference = ref(storage, itemRefGs);
          getDownloadURL(gsReference).then((url) => {
          });
           */
        });
        setData(loadedData);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  // TODO - TRY DOWNLOAD THE FILE WITHOUT OPENING A NEW TAB
  const downloadFileHandler = (uri) => {
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, uri);
    // Get the download URL
    getDownloadURL(gsReference).then((url) => {
      window.open(url);
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

  return (
    <>
      <div className={styles.title}>
        <h1>Tutorials</h1>
      </div>
      <div className={styles.search}>
        <label>Search:</label>
        <input
          onfocus="this.value=''"
          type="text"
          label="Search"
          onChange={searchInputHandler}
        />
      </div>
      <div className={styles.filter}>
        <label>Show:</label>
        <select
          name="type"
          id="type"
          onChange={(e) => filterChangeHandler(e.target.value)}
        >
          <option value="">All</option>
          <option value="/hardware">Hardware</option>
          <option value="/pos">Pos</option>
          <option value="/selfpos">Self-pos</option>
        </select>
      </div>
      <div className={styles.list}>
        <ul>
          {filteredData.map((file) => (
            <>
              <li>{file.name}</li>
              <button onClick={() => downloadFileHandler(file.uri)}>get</button>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tutorials;
