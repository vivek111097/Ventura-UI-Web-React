import React from "react";

// Destructuring Styles
// import classes from "./button.module.css";

// Re-useable button component
const ButtonUI = (props) => {
  const { type, onClick , disabled , btnType} = props;
  return (
    <>
      <button className={[`btn`, [btnType]].join(' ')} type={type || "button"} onClick={onClick || void(0)} disabled={disabled || false}>
        {props.children}
      </button>
    </>
  );
};

export default ButtonUI;
