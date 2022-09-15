import React from "react";
import Head from 'next/head'
import Left from "./Left.component";
import Right from "./Right.component";
import styles from "./Landing.module.css";
import WelcomComponent from "./../WelcomToVentura/Welcom.component";
import EnterPan from "./VerifyPAN/EnterPan.component";
import PANCardDetails from "./VerifyPAN/PANCardDetails.component";
import PickAPlan from "./PickPlan/PickAPlan.component";

const Landing = () => {
  return (
    <>
      <Head>
        <title>Ventura</title>
        <link rel="shortcut icon" href="/images/fevicon.png" />
      </Head>
      {/* <Loader /> */}
      {/* <WelcomComponent/> */}
      {/* <EnterPan /> */}
      {/* <PANCardDetails /> */}
      {/* <PickAPlan /> */}
      {/* <img src="/images/fevicon.png" /> */}

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



