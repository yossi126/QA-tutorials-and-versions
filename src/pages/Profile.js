import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  let username = "";
  dataCtx.users.forEach((element) => {
    if (element.uid === authCtx.user.uid) {
      username = element.name;
    }
  });

  return (
    <>
      <div className="container text-center mt-3 pb-3">
        <h1 className="display-4">Welcome {username} &#9996; </h1>
        {authCtx.user.email === "yossi126@gmail.com" ? (
          <div>
            <Link to="/profile/add-tutorial">
              <button type="button" className="m-2 btn btn-dark">
                Add tutorial
              </button>
            </Link>
            <Link to="/profile/add-version">
              <button type="button" className="btn btn-dark">
                Add version
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
