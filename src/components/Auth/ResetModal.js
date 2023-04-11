import React, { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

const ResetModal = () => {
  const emailInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const resetMailHandler = () => {
    authCtx.resetEmail(emailInputRef.current.value);
    emailInputRef.current.value = "";
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reset your password</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              ref={emailInputRef}
              type="text"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
              onClick={resetMailHandler}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
