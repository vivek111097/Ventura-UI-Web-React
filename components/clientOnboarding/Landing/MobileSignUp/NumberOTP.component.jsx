import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import ButtonUI from "../../../ui/Button.component";
import { connect } from "react-redux";
import {
  SET_MOBILE_OTP_VALIDATED,
  
} from "../../../../Redux/Landing";
import Loader from "../../../ui/Loader/Loader.component";
import AxiosInstance from "../../../../Api/Axios/axios";
import Modal from "../../../ui/Modal/Modal.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
const NumberOTP = (props) => {
  const { showModal, toggleModal } = props;
  const [isLoading, setisLoading] = useState(false);
  const [counter, setCounter] = useState(10);
  const [OtpCount, setOtpCount] = useState(0);
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const router = useRouter();

  // console.clear();

  const onSubmit = async (data) => {
    try {
      setisLoading(true);

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
      console.log(getData)
      const res = await getData.data;
console.log(res.message)
      if (res) {
        setisLoading(false);
        if (getData.status == 200) {
          setOtpCount((OtpCount) => OtpCount + 1)
          let returning_user = {
            last_access: res.returning_user.last_access,
            last_state: res.returning_user.last_state,
          };
          let user = {

            IsPhoneOTPValidated: true,
            returning_user,
          };
          props.updateOtpValidation(user);

          // props.storeSession(returning_user);
        } else if (getData.status == 400) {
          alert("OTP has expired please SignUp again.");
        } else {
          props.toggleModal();
        }
      }
      reset();
    } catch (error) {
      errors=error.response.data.message;
      console.log(error.response.data.message)
      props.toggleModal();
      setisLoading(false);
      reset();
    }
  };

  
  const resendOtp = async () => {         
    try {
      setCounter(10);
      const APIData = {
        phone: parseInt(props.phone),
      };
      const getData = await AxiosInstance.post(
        "/signup/user/phone/otp/verify",
        {
          ...APIData,
        }
      );
      const response = await getData.data;

      console.log(response);
      if (response) {
        setOtpCount((OtpCount) => OtpCount + 1)
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
  useEffect(() => {
    let inputs = document.querySelectorAll("input");
    let values = Array(4);
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
      });
    });

    function filldata(index) {
      for (let i = index; i < inputs.length; i++) {
        inputs[i].value = clipData.shift();
      }
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
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <UseCountdown></UseCountdown> */}
            <div className="container">
              <h2 className="title">OTP sent</h2>
              <p className="subTitle">
                We have sent an OTP to your mobile number +91-{props.phone}.
              </p>
              <div className="enterOTP row">
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFirst"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpFirst",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFirst", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpSecond"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpSecond",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpSecond", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpThird"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpThird",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpThird", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFourth"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpFourth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFourth", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpFifth"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpFifth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpFifth", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="otp"
                    id="otpSixth"
                    type="text"
                    min="0"
                    max="9"
                    step="1"
                    autocomplete="off"
                    onInput={(event) => {
                      setValue(
                        "otpSixth",
                        event.target.value.replace(/\D/g, "")
                      );
                    }}
                    {...register("otpSixth", {
                      required: true,
                    })}
                    maxLength={1}
                  />
                </div>
              </div>
              {errors.otp && (
            <small className="form-text text-danger">
            Provided OTP is wrong please enter valid OTP.
            </small>
          )}
              <div className="row otpTimerResend">
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
              <ButtonUI type={"submit"}>Verify OTP</ButtonUI>
            </div>
          </form>
          {showModal === true ? (
            <Modal onClick={toggleModal}>
              <ButtonUI onClick={toggleModal}>x</ButtonUI>
              <h1>something went Wrong</h1>
            </Modal>
          ) : null}
          {/* { showModalSuccess === true ? (
        <Modal onClick={toggleModal}>
          <ButtonUI onClick={toggleModal}>x</ButtonUI>
          <h1>Otp Send Successfull</h1>
        </Modal>
      ) : null } */}
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
    updateOtpValidation: (OtpVerified) => {
      console.log(OtpVerified);
      dispatch(SET_MOBILE_OTP_VALIDATED(OtpVerified));
    },
    storeSession: (session) => dispatch(STORE_SESSION(session)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberOTP);
