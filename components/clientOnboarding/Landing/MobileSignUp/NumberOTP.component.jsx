import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";

import ButtonUI from "../../../ui/Button.component";
import { SET_MOBILE_OTP_VALIDATED } from "../../../../Redux/Landing";
import Loader from "../../../ui/Loader/Loader.component";
import AxiosInstance from "../../../../Api/Axios/axios";
import Modal from "../../../ui/Modal/Modal.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";

const NumberOTP = (props) => {
  const { showModal, toggleModal } = props;
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [errorMsg, seterrorMsg] = useState(null);
  const [counter, setCounter] = useState(60);
  const [OtpCount, setOtpCount] = useState(0);
  const [otpErrorMSg, setotpErrorMSg] = useState("");
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

  // console.clear();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // setisLoading(true);

      // Destructuring All the Input
      const { otpFirst, otpSecond, otpThird, otpFourth, otpFifth, otpSixth } =
        data;

      // Storing all input in one variable
      const otp = `${otpFirst}${otpSecond}${otpThird}${otpFourth}${otpFifth}${otpSixth}`;
      const phone = props.phone;
      const APIData = {
        phone: parseInt(phone),
        otp: parseInt(otp),
      };
      console.log(APIData);
      const getData = await AxiosInstance.post(
        "/signup/user/phone/otp/verify",
        {
          ...APIData,
        },
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );
      console.log(getData);
      const res = await getData.data;
      console.log(res);
      if (res) {
        // setisLoading(false);
        if (getData.status == 200) {
          // setOtpCount((OtpCount) => OtpCount + 1);
          let returning_user = {
            last_access: res.returning_user.last_access,
            last_state: res.returning_user.last_state,
          };
          let user = {
            IsPhoneOTPValidated: true,
            returning_user,
          };
          props.updatePhoneOtpValidation(user);
          // props.toggleModal()
          // props.storeSession(returning_user);
        } else if (getData.status == 400) {
          // alert("OTP has expired please SignUp again.");
        } else {
          seterrorMsg("Something went wrong");
          // props.toggleModal();
        }
      }
      reset();
    } catch (error) {
      // errors=error.response.data.message;
      // console.log(error.response.data.message)
      console.log(error);
      if (error.response.data.message) {
        seterrorMsg(error.response.data.message);
      } else {
        seterrorMsg("Network Error");
      }
      // props.toggleModal();
      setisOtpErrorMSgVisible(true);
      setisDisabled(true);
      setOtpCount((OtpCount) => OtpCount + 1);
      // setisLoading(false);
      reset();
    }
  };

  // Invalid PIN 1/3 :
  const resendOtp = async () => {
    try {
      // setisOtpErrorMSgVisible(true);
      reset()
      setCounter(60);
      // setotpErrorMSg(" Your account will get temporarily blocked after 3 wrong attempts.")
      // setOtpCount((OtpCount) => OtpCount + 1);
      setisDisabled(true)
      const APIData = {
        phone: parseInt(props.phone),
      };
      const getData = await AxiosInstance.post("/signup/user/phone", {
        ...APIData,
      });
      const response = await getData.data;

      console.log(response);
      if (response) {
        // setOtpCount((OtpCount) => OtpCount + 1)
        // props.updatePhoneOtpValidation(true);
      } else {
        seterrorMsg("Something went wrong");
        // props.toggleModal();
      }
      reset();
    } catch (error) {
      seterrorMsg(error.response.data.message);
      alert(errorMsg);
      // props.toggleModal();
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
        clipData = event.clipboardData
          .getData("text/plain")
          .replace(/\D/g, "")
          .split("");
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
        inputs[i].value = clipData.shift();
      }*/
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
    //    inputs.forEach((item,index)=>{
    //     console.log(item.value.length)
    //  item.value.length
    //     // console.log(index)
    //    })
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

  const maskedMob = props.phone.toString().replace(/.(?=.{4})/g, "x");
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <UseCountdown></UseCountdown> */}
            <div className="container">
              <h2 className="title animate__animated">OTP sent</h2>
              <p className="subTitle animate__animated">
                We have sent an OTP to your mobile number +91-{maskedMob}.
              </p>
              <div className="enterOTP row animate__animated">
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
                    //   setValue("otpFirst", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                    //   setValue("otpSecond", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                    //   setValue("otpThird", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                    //   setValue("otpFourth", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                    //   setValue("otpFifth", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                    //   setValue("otpSixth", event.clipboardData.getData('text/plain').replace(/\D/g,""))
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
                  {counter === 0 && (
                    <Link href="">
                      <a className="btnLInk" onClick={resendOtp}>
                        Resend OTP
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              {isOtpErrorMSgVisible && (
                <div className="otpTimerResend errorMsgOtp">
                  <span className="attempts">Invalid PIN {OtpCount}/3</span> :
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
          {/* {showModal === true ? (
            <Modal onClick={toggleModal}>
              <p>{errorMsg}</p>
              <ButtonUI onClick={toggleModal}>OK</ButtonUI>
            </Modal>
          ) : null} */}
        </>
      )}
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
    updatePhoneOtpValidation: (OtpVerified) => {
      console.log(OtpVerified);
      dispatch(SET_MOBILE_OTP_VALIDATED(OtpVerified));
    },
    storeSession: (session) => dispatch(STORE_SESSION(session)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberOTP);
