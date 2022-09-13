import React from 'react'


import styles from ".././Landing.module.css";
import MailSingUp from './MailSingUp.component';

const MailSignUpCard = () => {
  return (
<>

<div className={styles.signUpBox}>
    <img
      src="/images/VenturaLogo.png"
      alt="Ventura Logo"
      className={styles.logo}
    />
    <h3>Ready to get started?</h3>
    <p className={styles.subTitle}>
      Enter your Email to help us set up your investment account.
    </p>
    <MailSingUp />
    <p className={styles.haveAnAccount}>
      Have an account?
      <a href=""> Login</a>
    </p>
    <p className={styles.termsOfUse}>
      By proceeding, you accept Ventura’s <strong>Terms of Use</strong>{" "}
      <br />
      and <strong>Privacy Policy</strong>.
    </p>
  </div>
</>
  )
}

export default MailSignUpCard