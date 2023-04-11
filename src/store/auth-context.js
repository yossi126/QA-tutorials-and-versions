import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = React.createContext({
  login: (email, password) => {},
  logout: () => {},
  singup: (name, email, password) => {},
  resetEmail: (email) => {},
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

        toast.success("Sighup success", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // go to the main path after sighup
        history.replace("/profile");

        // update the user obj in the firestore collection
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

        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const loginHandler = (email, password) => {
    const id = toast.loading("Please wait...", {
      position: "bottom-center",
    });
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("signed in");
            // Signed in
            const user = userCredential.user;
            // go to the main path after login
            history.replace("/profile");

            toast.update(id, {
              render: "Welcome",
              type: "success",
              position: "bottom-center",
              isLoading: false,
              autoClose: 1500,
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            toast.update(id, {
              render: errorMessage,
              type: "error",
              position: "top-right",
              isLoading: false,
              autoClose: 3000,
            });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.update(id, {
          render: errorMessage,
          type: "error",
          position: "top-center",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const logoutHandler = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      history.replace("/");
    });
  };

  const resetEmailHandler = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Reset password email sent!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        history.replace("/profile");
        //console.log(user);
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
    resetEmail: resetEmailHandler,
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
