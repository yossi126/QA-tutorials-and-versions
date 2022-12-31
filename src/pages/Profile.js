import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div>
        {/* {JSON.stringify(authCtx.user, null, 2)} */}
        <h1>{`User: ${authCtx.user.email}`}</h1>
      </div>
    </>
  );
};

export default Profile;
