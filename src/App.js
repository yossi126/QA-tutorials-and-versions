import React from "react";
import Header from "./components/Header";
import Missions from "./components/Missions/Missions";
import DataProvider from "./store/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <Header />
      <Missions />
    </DataProvider>
  );
};

export default App;
