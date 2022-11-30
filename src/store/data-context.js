import React from "react";

const DataContext = React.createContext({
  users: [],
  missions: [],
  //addMissions: (mission) => {},
});

export default DataContext;
