import Link from 'next/link';
import React from 'react';

import ButtonUI from '../../Button.component';
import Styles from "./PANValidation.module.css"

const PANAlreadyExistValidation = () => {
  return (
    <div className={Styles.alertContainer}>
        <img src="/images/alert_icon.png" alt="alert icon" className={Styles.alertImg}/>
        <h1 className={Styles.alertTitle}>PAN already exists</h1>
        <p className={Styles.alertSubTitle}>This PAN already exists in our records.Enter another PAN or try signing in.</p>
        <div className={Styles.warningContainer}>
            <h6>Warning</h6>
            <p>Your progress will be reset after 3 incorrect attempts.</p>
        </div>
        <ButtonUI><Link  href={"/co/pan"}><a>Enter another PAN</a></Link></ButtonUI>
        <div className={Styles.signBtn}>
            <Link  href={"/co/pan"}><a className={Styles.existingUser}>Exixting User?</a></Link>
            <Link  href={"/co/pan"}><a>Try Signing in</a></Link>
        </div>
  </div> 
  );
}

export default PANAlreadyExistValidation;
