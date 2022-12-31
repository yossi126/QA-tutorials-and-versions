import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext({
  login: (email, password) => {},
  logout: () => {},
  singup: (name, email, password) => {},
  user: null,
  isLoggedIn: false,
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();

  const userIsLoggedIn = !!currentUser;

  const collectionRef = collection(db, "users");

  const singupHandler = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("singup sucsses");
        history.replace("/profile");
        setDoc(doc(collectionRef, user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
        });
      })
      .then(() => {})
      .catch((e) => {
        console.log(e.message);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const loginHandler = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.replace("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode);
      });
  };

  const logoutHandler = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      history.replace("/");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // User is signed out
        history.replace("/");
      }
    });
    return () => {
      console.log("clean up");
      unsubscribe();
    };
  }, []);

  const contextValue = {
    singup: singupHandler,
    login: loginHandler,
    logout: logoutHandler,
    user: currentUser,
    isLoggedIn: userIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
