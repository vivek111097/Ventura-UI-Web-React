import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";


import {
  SET_MOBILE_OTP_VALIDATED,
  STORE_SESSION,
} from "../../../../Redux/Landing";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
import ButtonUI from "../../../ui/Button.component";
import Modal from "../../../ui/Modal/Modal.component";
import AxiosInstance from "../../../../Api/Axios/axios";
const ResendOTP = (props) => {
  const { showModal, toggleModal } = props;

  const [counter, setCounter] = useState(10);
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const resendOtp = async () => {
    try {
      setCounter(10);
      const APIData = {
        phone: parseInt(props.phone),
      };
      const getData = await AxiosInstance.post("/signup/user/phone", {
        ...APIData,
      });
      const response = await getData.data;

      console.log(response);
      if (response) {
        setOtpCount((OtpCount) => OtpCount + 1);
        props.updateOtpValidation(true);
      } else {
        props.toggleModal();
      }
      reset();
    } catch (error) {
      props.toggleModal();
      console.log(error);
      reset();
    }
  };
  return (
    <>
      <Link href="">
        <a className="btnLInk" onClick={resendOtp}>
          Resend OTP
        </a>
      </Link>
      {showModal === true ? (
        <Modal onClick={toggleModal}>
          <h1>OTP has expired please SignUp again.</h1>
          <ButtonUI onClick={toggleModal}>OK</ButtonUI>
        </Modal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
    phone: state.LandingReducer.user.phone,
    showModal: state.modalReducer.showModal,
    // showModalSuccess: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOtpValidation: (OtpVerified) => {
      console.log(OtpVerified);
      dispatch(SET_MOBILE_OTP_VALIDATED(OtpVerified));
    },
    storeSession: (session) => dispatch(STORE_SESSION(session)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResendOTP);
