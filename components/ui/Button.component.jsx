import React from "react";

// Destructuring Styles
// import classes from "./button.module.css";

// Re-useable button component
const ButtonUI = (props) => {
  const { type, onClick , disabled } = props;
  return (
    <>
      <button className="btn" type={type || "button"} onClick={onClick || null} disabled={disabled || false}>
        {props.children}
      </button>
    </>
  );
};

export default ButtonUI;
