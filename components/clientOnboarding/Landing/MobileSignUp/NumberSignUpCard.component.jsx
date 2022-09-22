import React from "react";

import NumberSingUp from "./NumberSingUp.component";
import styles from ".././Landing.module.css";

const NumberSignUpCard = () => {
  return (
    <div className={styles.signUpBox}>
      <img className={styles.lineBg} src="/images/lineBg.png" alt="" />
      <img className={styles.lineBgBottom} src="/images/cardLinesBottom.png" alt="" />
      <img
        src="/images/VenturaLogo.png"
        alt="Ventura Logo"
        className={`animate__animated ${styles.logo}`}
      />

      <div className={styles.form_wrap}>
        {/* <h3>Ready to get started?</h3>
    <p className={styles.subTitle}>
      Enter your number to help us set up your investment account.
    </p> */}
        <NumberSingUp />
        {/* <p className={styles.haveAnAccount}>
      Have an account?
      <a href=""> Login</a>
    </p>
    <p className={styles.termsOfUse}>
      By proceeding, you accept Ventura’s <strong>Terms of Use</strong>{" "}
      <br />
      and <strong>Privacy Policy</strong>.
    </p> */}
      </div>

    </div>
  );
};

export default NumberSignUpCard;
