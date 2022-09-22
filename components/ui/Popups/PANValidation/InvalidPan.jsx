import Link from "next/link";
import React from "react";
import ButtonUI from "../../Button.component";
import Styles from "./PANValidation.module.css";

const InvalidPan = ({
  showModal,
  errorMsg,
  responceType,
  icon,
  buttonText,
  content,
}) => {
  console.log(showModal);
  console.log(responceType);
  console.log(errorMsg);
  console.log(buttonText);
  console.log(content);
  console.log(icon);
  return (
    <div className={Styles.alertContainer}>
      {icon ? (
        icon && responceType == "success" ? (
          <span className="icon-successfully"></span>
        ) : (
          <span className="icon-Access-denied"></span>
        )
      ) : null}
      <h1 className={Styles.alertTitle}>{errorMsg}</h1>
      <p className={Styles.alertSubTitle}>{content}</p>
      <ButtonUI onClick={showModal}>
        <Link href={"/co/pan"}>
          <a>{buttonText}</a>
        </Link>
      </ButtonUI>
    </div>
  );
};

export default InvalidPan;
