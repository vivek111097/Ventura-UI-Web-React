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
    <MailSingUp />
  </div>
</>
  )
}

export default MailSignUpCard