import React from "react";

// Destructuring Styles 
import classes from "./button.module.css"; 
 
// Re-useable button component 
const ButtonUI = (props) => {
  const {disable} = props
  return (
    <>
      <button className={disable && [classes.disabledTest]}>{props.children}</button>
    </>
  );
};

export default ButtonUI;
