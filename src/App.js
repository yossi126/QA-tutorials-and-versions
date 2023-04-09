import React, { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import { DataProvider } from "./store/data-context";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import TaskForm from "./components/Tasks/TaskForm";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Tutorials from "./pages/Tutorials";
import AuthContext from "./store/auth-context";
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
          {authCtx.user && (
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/tasks" exact>
              <Tasks />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/tasks/new-task">
              <TaskForm />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/users">
              <Users />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {authCtx.user && (
            <Route path="/tutorials" exact>
              <Tutorials />
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
