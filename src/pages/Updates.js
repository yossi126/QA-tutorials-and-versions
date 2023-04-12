import React, { useContext, useState } from "react";
import DataContext from "../store/data-context";
import VersionItem from "../components/Updates/VersionItem";

const Updates = () => {
  const dataCtx = useContext(DataContext);
  return (
    <>
      <div className="d-flex mt-3 justify-content-center">
        <h1 className="display-4">POS Versions & Updates</h1>
      </div>

      <ul>
        <div className="d-flex mt-4 flex-wrap justify-content-center">
          {dataCtx.versions.map((version) => (
            <VersionItem
              key={version.id}
              id={version.id}
              latestUpdate={version.latestUpdate}
              download={version.download}
              releaseDate={version.releaseDate}
            />
          ))}
        </div>
      </ul>
    </>
  );
};

export default Updates;
