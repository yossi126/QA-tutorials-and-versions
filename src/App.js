import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import DataProvider from "./store/DataProvider";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import TaskForm from "./components/Tasks/TaskForm";

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <DataProvider>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
          <Route path="/tasks/new-task">
            <TaskForm />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </DataProvider>
    </Fragment>
  );
};

export default App;
