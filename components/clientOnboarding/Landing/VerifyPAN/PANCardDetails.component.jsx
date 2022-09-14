import React from "react";
import Header from "../../../global/Header.component";
import styles from "./Pan.module.css";
import ButtonUI from "../../../ui/Button.component";
const PANCardDetails = () => {
  return (
    <>
      <Header />
      <section className="ContainerBG">
        <div className="bgtop">
          <img src="/images/welcomebgtop.png" />
        </div>
        <div className="bgbottom">
          <img src="/images/welcomebgbottom.png" />
        </div>
        <div className="containerMini">
          <h2 className="title">Your PAN details</h2>
          <p className="subTitle">
            This PAN will be used to set up your demat account.
          </p>
          <div className={styles.panNoTxt}>AGMLS6667Z</div>
          <div className={styles.panCardBox}>
            <div className={styles.panCont}>
              <div className={styles.list}>
                <span>Name</span>
                <h4>Mr. Arvind Mohan Nath</h4>
              </div>
              <div className={styles.list}>
                <span>Permanent Account Number</span>
                <h4>AGMLS6667Z</h4>
              </div>
            </div>
          </div>
          <a href="" className={styles.notYourPan}>Not your PAN? Try again</a>
          <ButtonUI type={"submit"}>Continue</ButtonUI>
        </div>
      </section>
    </>
  );
};

export default PANCardDetails;
