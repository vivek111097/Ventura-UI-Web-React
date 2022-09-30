import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Router, useRouter } from "next/router";
import { auth } from "./firebse/firebse";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { TOGGLE_MODAL } from "../../../../Redux/modal";
import { STORE_EMAIL } from "../../../../Redux/Landing";

import ButtonUI from "../../../ui/Button.component";
import styles from ".././Landing.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import Modal from "../../../ui/Modal/Modal.component";

const MailInput = (props) => {
  // Creating Router For Routing Purpose
  const router = useRouter();

  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Error Msg State
  // const [errorMsg, seterrorMsg] = useState(null);

  // OTP State
  const { otpSent, setotpSent } = props;

  // Modal State
  const { showModal, toggleModal } = props;

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // Defining Regex for Email
  const MailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //   Email Validation
  const validateEmail = (email) => {
    if (MailRegex.test(email)) {
      return true;
    } else {
      return "Invalid Email ID";
    }
  };

  // Handling Form  on Submit USing Async Await
  const onSubmit = async (data) => {
    try {
      // Set Loading to true When Submitting the Form
      setisLoading(true);

      // Sending data to API
      const APIData = {
        email: data.email,
      };

      const getData = await AxiosInstance.post("/signup/user/email", APIData, {
        headers: {
          session_id: props.session_id,
        },
      });

      //   receiving response from backend
      const res = await getData.data;
      if (getData.status == 200) {
        // set loading False if Response is Successful
        setisLoading(false);

        // set OTP True if Response is Successful
        setotpSent(true);

        let MailData = {
          email: data.email,
          IsEmailOTPSent: true,
        };

        // Storing tha data in redux
        props.setEmail(MailData);
      } else {
        // If Anything Goes Wrong then Display Modal With Error && Set Loading to True
        props.toggleModal();
        setisLoading(false);
      }

      // Reset The Input Field
      reset();
    } catch (error) {
      // Error IF Something Goes Wrong
      props.toggleModal();
      setisLoading(false);
      // Reset The Input Field
      reset();
    }
  };
  const signInWithGoogle = async () => {
    try {
      // Creating Continue With G-mail Functionality
      const provider = new GoogleAuthProvider();

      const userData = await signInWithPopup(auth, provider);

      const response = userData.user;

      const APIData = {
        email: response.email,
      };

      const getData = await AxiosInstance.post(
        "/signup/user/email",
        { ...APIData },
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );

      const res = await getData.data;
      if (getData.status == 200) {
        // Redirect To Welcome Page Instead of OTP Component
        router.push("/co/welcome");
      } else {
        // props.toggleModal();
      }
      // console.log(response)
    } catch (error) {
      //temprary
      router.push("/co/welcome");
      console.log(error);
    }
  };
  useEffect(() => {
    // Adding Animation to div's
    var lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, []);
  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <h2 className="title animate__animated">Add your email</h2>
          <p className="subTitle animate__animated">
            This is where we&lsquo;ll send you important updates and insights on
            the market.
          </p>
          {/* Email Form  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row animate__animated">
              <div className="col">
                {/* Defining Email Input */}
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  {...register("email", {
                    required: "Email is required",
                    validate: validateEmail,
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              </div>
            </div>

            {/* Submit BUtton */}
            <div className="animate__animated">
              <ButtonUI
                btnType="btn btn-outline"
                type={"submit"}
                disabled={!isDirty || !isValid}
              >
                Verify Email
              </ButtonUI>
            </div>
            <div className={`animate__animated ${styles.or}`}>OR</div>
          </form>
          <div className="animate__animated">
            <ButtonUI
              btnType={styles.gmail}
              type={"submit"}
              onClick={signInWithGoogle}
            >
              <img src="/images/googleMail.svg" alt="gmail Icon" /> Continue
              with Google
            </ButtonUI>
          </div>
        </>
      )}
      {showModal === true ? (
        <Modal onClick={toggleModal}>
          <div className="center">
            <h3 className="title">Some thing went Wrong</h3>
          </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => dispatch(STORE_EMAIL(email)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailInput);
