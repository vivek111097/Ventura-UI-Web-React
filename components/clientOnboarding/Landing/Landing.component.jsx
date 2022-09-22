import React, { useState, useEffect } from "react";
import Head from "next/head";
import Left from "./Left.component";
import Right from "./Right.component";
import styles from "./Landing.module.css";
import WelcomComponent from "./../WelcomToVentura/Welcom.component";
import EnterPan from "./VerifyPAN/EnterPan.component";
import PANCardDetails from "./VerifyPAN/PANCardDetails.component";
import PickAPlan from "./PickPlan/PickAPlan.component";
import AuthContext from "./Store";

const Landing = () => {
  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width <= 767) {
        setRightVisible(false);
      }
    }
  }, []);

  const responsiveHandler = (setRightVisible) => {
    setRightVisible(setRightVisible);
  };

  const mobileSignupHandler = () => {
    setRightVisible(true);
    setLeftVisible(false);
  };

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
        {leftVisible && (
          <div className={`col-6 ${styles.leftBg}`}>
            <div className="row align-items-center">
              <div className="col">
                <AuthContext.Provider
                  value={{
                    isClicked: false,
                    hideRightDiv: mobileSignupHandler,
                  }}
                >
                  <Left />
                </AuthContext.Provider>
              </div>
            </div>
          </div>
        )}
        <div className="col-6">
          <div className="row align-items-center">
            <div className="col">{rightVisible && <Right />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
