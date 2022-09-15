import React from "react";
import Header from "../../../global/Header.component";
import styles from "./Pan.module.css";
import ButtonUI from "../../../ui/Button.component";
import { connect } from "react-redux";
import Link from "next/link";
const PANCardDetails = (props) => {
  console.log(props)
  const {pan}=props
  console.log(props.pan)
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
          <div className={styles.panNoTxt}>{pan.pan}</div>
          <div className={styles.panCardBox}>
            <div className={styles.panCont}>
              <div className={styles.list}>
                <span>Name</span>
                <h4>Mr. {pan.name}</h4>
              </div>
              <div className={styles.list}>
                <span>Permanent Account Number</span>
                <h4>{pan.pan}</h4>
              </div>
            </div>
          </div>
          <Link href={"/co/pan"}><a  className={styles.notYourPan}>Not your PAN? Try again</a></Link>
          <Link href={"/co/nominee"}><ButtonUI type={"submit"}>Continue</ButtonUI></Link>
        </div>
      </section>
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    pan: state.LandingReducer.user.pan,
    phone: state.LandingReducer.user.phone,
    showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // storePAN: (isValidated) => dispatch(STORE_PAN(isValidated)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PANCardDetails);