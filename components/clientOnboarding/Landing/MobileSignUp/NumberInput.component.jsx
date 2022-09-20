import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { STORE_SESSION } from "../../../../Redux/Landing";
import { TOGGLE_MODAL } from "../../../../Redux/modal";

import ButtonUI from "../../../ui/Button.component";
import Loader from "../../../ui/Loader/Loader.component";
import Modal from "../../../ui/Modal/Modal.component";
import styles from ".././Landing.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";

const NumberInput = (props) => {
  const { showModal, toggleModal } = props;
  const [errorMsg, seterrorMsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { otpSent, setotpSent } = props;

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // Defining Regex for mobile number
  const phoneNumberRegex = new RegExp(/^[6-9]\d{9}$/i);

  //   Number Validation
  const validatePhone = (phone) => {
    if (phoneNumberRegex.test(phone)) {
      return true;
    } else {
      return "Invalid Phone Number";
    }
  };

  // Handling Form on Submit Using Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const APIData = {
        phone: parseInt(data.phone),
        enable_whatsapp: data.enableWhatsapp,
      };
      console.log(APIData);
      const getData = await AxiosInstance.post("/signup/user/phone", {
        ...APIData,
      });
      const getSession_ID = await AxiosInstance.post("/signup/session-id", {
        ...APIData,
      });

      // receiving response from backend

      const sessionRes = await getSession_ID.data;
      const res = await getData.data;
      if (getSession_ID.status == 200) {
        console.log(sessionRes);
        console.log(res);
        setisLoading(false);
        setotpSent(true);
        let UserSession = {
          session_id: sessionRes.session_id,
          phone: parseInt(sessionRes.phone),
          IsPhoneOTPSent: true,
          clientid: res.clientid,
          existing_user: res.existing_user,
          new_user: res.new_user,
          returning_user: res.returning_user,
        };
        props.storeSession(UserSession);
      } else {
        props.toggleModal();
      }
      reset();
    } catch (error) {
      props.toggleModal();
      setisLoading(false);
      console.log(error);
      reset();
    }
  };

  // useEffect(() => {
  //   var lineItem = document.querySelectorAll(".animate__animated");
  //   lineItem.forEach((item, index) => {
  //     item.className += " animate__fadeInUp animate__delay_" + index;
  //   });
  // }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <h2 className="title animate__animated ">Ready to get started?</h2>
          <p className="subTitle animate__animated ">
            Enter your number to help us set up your investment account.
          </p>

          {/* Mobile Number Input Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row  animate__animated  ">
              <div className="col-auto ">
                <input
                  className="form-control countryCode"
                  defaultValue={"+91"}
                />
              </div>
              <div className="col">
                {/* Number Inout Field */}
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter mobile number"
                  name="phone"
                  maxLength={10}
                  {...register("phone", {
                    required: true,
                    validate: validatePhone,
                  })}
                  onInput={(e) => {
                    setValue("phone", e.target.value.replace(/\D/g, ""));
                  }}
                  onKeyUp={() => {
                    trigger("phone");
                  }}
                />
              </div>
            </div>

            {/* WhatsApp Notification Button Default Value Will Be Checked */}
            <div className="checkBox  animate__animated ">
              <input
                type="checkbox"
                id="enableWhatsapp"
                {...register("enableWhatsapp")}
                defaultChecked={"checked"}
              />
              <label htmlFor="enableWhatsapp">
                Enable WhatsApp notifications
              </label>
            </div>

            {/* Submit Button */}
            <div className="animate__animated ">
              <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
                {/* {isLoading===true ? (<Loader/> ):    "Continue " } */}
                Continue
              </ButtonUI>
            </div>
          </form>
          <p className={`animate__animated  ${styles.haveAnAccount} `}>
            Have an account?
            <a href="">Login</a>
          </p>
          <p className={`animate__animated  ${styles.termsOfUse} `}>
            By proceeding, you accept Ventura’s <a href="">Terms of Use</a>{" "}
            <br />
            and <a href="">Privacy Policy</a>.
          </p>
          {showModal === true ? (
            <Modal onClick={toggleModal}>
              <p>Some thing went Wrong</p>
            </Modal>
          ) : null}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSession: (session) => dispatch(STORE_SESSION(session)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NumberInput);
