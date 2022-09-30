import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import AxiosInstance from "../../../../Api/Axios/axios";
import {
  SET_EMAIL_OTP_VALIDATED,
  SET_MOBILE_OTP_VALIDATED,
} from "../../../../Redux/Landing";
import { TOGGLE_MODAL } from "../../../../Redux/modal";

import ButtonUI from "../../../ui/Button.component";
import Loader from "../../../ui/Loader/Loader.component";
import Modal from "../../../ui/Modal/Modal.component";

const MailOTP = (props) => {
    // Modal State
  const { showModal, toggleModal } = props;
    // Loading State
  const [isLoading, setisLoading] = useState(false);
    // Error Msg State
  const [errorMsg, seterrorMsg] = useState(null);

  // Button Disabled State
  const [isDisabled, setisDisabled] = useState(true);

  // Otp Counter State
  const [counter, setCounter] = useState(60);

  // Otp Sent Time Count
  const [OtpCount, setOtpCount] = useState(0);
  
  // Invalid OTP Msg
  const [isOtpErrorMSgVisible, setisOtpErrorMSgVisible] = useState(false);
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const router = useRouter();

  // Handling THe Form on Submit Using Async Await
  const onSubmit = async (data) => {
    try {
      // setisLoading(true);

      // Destructuring All the Input
      const { otpFirst, otpSecond, otpThird, otpFourth, otpFifth, otpSixth } =
        data;

      // Storing all input in one variable
      const otp = `${otpFirst}${otpSecond}${otpThird}${otpFourth}${otpFifth}${otpSixth}`;
      const email = props.email;

      // Sending data to API
      const APIData = {
        email: email,
        otp: parseInt(otp),
      };
      const getData = await AxiosInstance.post(
        "/signup/user/email/otp/verify",
        { ...APIData },
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );

      //   receiving response from backend
      const res = await getData.data;
      if (res) {
        if (getData.status == 200) {
          router.push("/co/welcome");

          // setisLoading(false);

          // Storing tha data in redux
          props.updateEmailOtpValidation(true);
          // props.updatePhoneOtpValidation(false);
        }
      } else {
   // If Anything Goes Wrong then Display Modal With Error && Set Loading to True
        seterrorMsg("Something went wrong");
      }
            // Reset The Input Field
      reset();
    } catch (error) {
      
            // Error IF Something Goes Wrong
      if (error.response.data.message) {
        seterrorMsg(error.response.data.message);
      } else {
        seterrorMsg("Network Error");
      }
      setisOtpErrorMSgVisible(true);
      setisDisabled(true);
      setOtpCount((OtpCount) => OtpCount + 1);
      setisLoading(false);
      reset();
    }
  };
// Resend Otp Functionality
  const resendOtp = async () => {
    try {
      // setisOtpErrorMSgVisible(true);
      reset();
      setCounter(60);
      setisDisabled(true);
      const APIData = {
        email: props.email,
      };
      const getData = await AxiosInstance.post(
        "/signup/user/resendotp",
        {
          ...APIData,
        },
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );
      const response = await getData.data;

      if (response) {
        setOtpCount(response.attempts_left)
        // setOtpCount((OtpCount) => OtpCount + 1)
        props.updatePhoneOtpValidation(true);
      } else {
        seterrorMsg("Something went wrong");
      }
      reset();
    } catch (error) {
      seterrorMsg(error.response.data.message);
      console.log(error);
      reset();
    }
  };
  useEffect(() => {
    let inputs = document.querySelectorAll("input");
    let values = Array(6);
    let clipData;
    inputs[0].focus();

    inputs.forEach((tag, index) => {
      tag.addEventListener("keyup", (event) => {
        if (event.code === "Backspace" && hasNoValue(index)) {
          if (index > 0) inputs[index - 1].focus();
        }

        //else if any input move focus to next or out
        else if (tag.value !== "") {
          index < inputs.length - 1 ? inputs[index + 1].focus() : tag.blur();
        }

        //add val to array to track prev vals
        values[index] = event.target.value;
      });

      tag.addEventListener("input", () => {
        //replace digit if already exists
        if (tag.value > 10) {
          tag.value = tag.value % 10;
        }
      });

      tag.addEventListener("paste", (event) => {
        event.preventDefault();
        clipData = event.clipboardData.getData("text/plain").split("");
        filldata(index);
        document.getElementById("otpSixth").focus();
      });
    });

    // function filldata(index) {
    //   for (let i = index; i < inputs.length; i++) {
    //     inputs[i].value = clipData.shift();
    //   }

    // }
    function filldata(index) {
      setValue("otpFirst", clipData[0]);
      setValue("otpSecond", clipData[1]);
      setValue("otpThird", clipData[2]);
      setValue("otpFourth", clipData[3]);
      setValue("otpFifth", clipData[4]);
      setValue(
        "otpSixth",
        clipData[5]
      ); /*for (let i = index; i < inputs.length; i++) {
��������inputs[i].value = clipData.shift();
������}*/
    }

    function hasNoValue(index) {
      if (values[index] || values[index] === 0) return false;

      return true;
    }
  }, []);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  if (OtpCount >= 3) {
    router.reload(window.location.pathname);
  }
  const checkvalue = () => {
    let inputs = document.querySelectorAll("input");

    const validInputs = Array.from(inputs).filter(
      (input) => input.value !== ""
    );
    if (validInputs.length == 6) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  };
  useEffect(() => {
    var lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, []);

  // Masking Email ID
  const maskid = props.email.replace(
    /^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, "x") + c
  );
  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          {/* OTP Input Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container ">
              <h2 className="title animate__animated">Enter OTP here</h2>
              <p className="subTitle animate__animated">
                We have sent an OTP to your email ID {maskid}
              </p>
              <div
                className="enterOTP row animate__animated"
                onBlur={checkvalue}
              >
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFirst"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpFirst", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpFirst",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFirst", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpSecond"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpSecond", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpSecond",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpSecond", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpThird"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpThird", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpThird",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpThird", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFourth"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpFourth", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpFourth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFourth", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFifth"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpFifth", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpFifth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFifth", {
                      required: true,
                    })}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpSixth"
                    type="password"
                    min="0"
                    max="9"
                    step="1"
                    autoComplete="off"
                    maxLength={1}
                    // onPaste={(event) => {
                    //   "otpSixth", event.target.value.replace(/\D/g, "");
                    // }}
                    onKeyUp={checkvalue}
                    onInput={(event) => {
                      setValue(
                        "otpSixth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpSixth", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              {/* {errors.otp && (
                <small className="form-text text-danger">
                  Provided OTP is wrong please enter valid OTP.
                </small>
              )} */}
              <div className="row otpTimerResend animate__animated">
                <div className="col-6 timer">
                  {counter === 0 ? null : <>00:{counter}s</>}
                </div>
                <div className="col-6 text-right">
                  {/* {counter === 0 && ( */}
                  <Link href="">
                    <a
                      className={`btnLInk ${counter != 0 && "disabled"}`}
                      onClick={resendOtp}
                    >
                      Resend OTP
                    </a>
                  </Link>
                  {/* )} */}
                </div>
              </div>
              {isOtpErrorMSgVisible && (
                <div className="otpTimerResend errorMsgOtp  animate__animated">
                  <span className="attempts">Invalid OTP {OtpCount}/3</span> :
                  Your account will get temporarily blocked after 3 wrong
                  attempts.
                </div>
              )}
              <div className="animate__animated">
                <ButtonUI type={"submit"} id="btn" disabled={isDisabled}>
                  Verify OTP
                </ButtonUI>
              </div>
            </div>
          </form>
          {showModal === true ? (
            <Modal onClick={toggleModal}>
              <p>{errorMsg}</p>
              <ButtonUI onClick={toggleModal}>OK</ButtonUI>
            </Modal>
          ) : null}
        </>
      )}
    </>
  );
};

// export default MailOTP;

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
    email: state.LandingReducer.user.email,
    showModal: state.modalReducer.showModal,
    // showModalSuccess: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmailOtpValidation: (isValidated) => {
      dispatch(SET_EMAIL_OTP_VALIDATED(isValidated));
    },
    updatePhoneOtpValidation: (OtpVerified) => {
      dispatch(SET_MOBILE_OTP_VALIDATED(OtpVerified));
    },
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailOTP);
