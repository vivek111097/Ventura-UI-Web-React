import React from "react";
import classes from "./Loader.module.css";
const Loader = () => {
  return (
    <>
      <div className={classes.snippet} data-title=".dot-flashing">
        <div className={classes.stage}>
          <div className={classes.dotFlashing}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
