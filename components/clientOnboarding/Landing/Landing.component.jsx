import React from "react";
import Left from "./Left.component";
import Right from "./Right.component";
import styles from "./Landing.module.css";
import WelcomComponent from './../WelcomToVentura/Welcom.component';
import EnterPan from './VerifyPAN/EnterPan.component';
import PANCardDetails from './VerifyPAN/PANCardDetails.component';
import PickAPlan from './PickPlan/PickAPlan.component';
import Loader from './Loader/Loader.component';

const Landing = () => {
  return (
    <>
    {/* <Loader /> */}
    {/* <WelcomComponent/> */}
    {/* <EnterPan /> */}
    {/* <PANCardDetails /> */}
    {/* <PickAPlan /> */}
    
      <div className={`row ${styles.fullHeight}`}>
        <div className={`col-6 ${styles.leftBg}`}>
          <div className="row align-items-center">
            <div className="col">
              <Left />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col">
              <Right />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
