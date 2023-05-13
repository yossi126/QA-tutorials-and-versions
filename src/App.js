import React, { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import { DataProvider } from "./store/data-context";
import Tasks from "./pages/Tasks";
import TaskForm from "./components/Tasks/TaskForm";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Tutorials from "./pages/Tutorials";
import Updates from "./pages/Updates";
import AuthContext from "./store/auth-context";
import AddTutorial from "./components/ProfileSettings/AddTutorial";
import AddVersion from "./components/ProfileSettings/AddVersion";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <MainNavigation />
      <DataProvider>
        <Switch>
          <Route path="/" exact>
            <Signup />
          </Route>
          {/* {authCtx.user && (
            <Route path="/tasks" exact>
              <Tasks />
            </Route>
          )}
          {authCtx.user.email === "yossi126@gmail.com" (
            <Route path="/tasks/new-task">
              <TaskForm />
            </Route>
          )} */}
          {authCtx.user && (
            <Route path="/profile" exact>
              <Profile />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/profile/add-tutorial">
              <AddTutorial />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/profile/add-version">
              <AddVersion />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/tutorials" exact>
              <Tutorials />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/updates" exact>
              <Updates />
            </Route>
          )}
          {/* add Redirect to the import*/}
          {/* <Route path="*">
            <Redirect to="/dashboard" />
          </Route> */}
        </Switch>
      </DataProvider>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
