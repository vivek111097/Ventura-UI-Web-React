import React from "react";



import Left from "./Left.component";
import Right from "./Right.component";
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <>
      <div className={`row ${styles.fullHeight}`}> 
        <div className={`col-6 ${styles.leftBg}`}>
          <Left />
        </div>
        <div className="col-6 animate__animated animate__bounce">
          <Right />
        </div>
      </div>
    </>
  );
};

export default Landing;
