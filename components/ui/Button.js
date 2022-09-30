import React from "react";

// Destructuring Styles 
import classes from "./button.module.css"; 
 
// Re-useable button component 
const ButtonUI = (props) => {
  const {disabled,onClick} = props
  return (
    <>
      <button onClick={onClick} disabled={disabled}>{props.children}</button>
    </>
  );
};

export default ButtonUI;
