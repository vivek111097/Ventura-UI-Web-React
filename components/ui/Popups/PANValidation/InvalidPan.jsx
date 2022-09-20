import Link from 'next/link';
import React from 'react';
import ButtonUI from '../../Button.component';
import Styles from "./PANValidation.module.css"

const InvalidPan = ({showModal,errorMsg}) => {
  return (
    <div className={Styles.alertContainer}>

    <img src="/images/alert_icon.png" alt="alert icon" className={Styles.alertImg}/>
    <h1 className={Styles.alertTitle}>{errorMsg}</h1>
    <p className={Styles.alertSubTitle}>Please try again or enter another PAN.</p>
    <ButtonUI onClick={showModal}><Link href={"/co/pan"}><a>Enter Pan again </a></Link></ButtonUI>

  </div>
  );
}

export default InvalidPan;
