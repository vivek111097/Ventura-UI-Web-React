import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonUI from "../../../ui/Button.component";
import { connect } from "react-redux";
import { SET_MOBILE_OTP_VALIDATED, SET_OTP_VALIDATED } from "../../../../Redux/Landing";
import Loader from "../../../ui/Loader/Loader.component";
import AxiosInstance from "../../../../Api/Axios/axios";
const NumberOTP = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [counter, setCounter] = React.useState(60);
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
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
      const res = await getData.data;
   
      if (res) {
       
          setisLoading(false);
        if (getData.status == 200) {
          // let OtpVerified = {
          //   IsPhoneOTPValidated: 1,
           
          // };
          props.updateOtpValidation(true);
          alert("OTP validation is successful");
          console.log(res);
        }else if(getData.status==400){
          alert("OTP has expired please SignUp again.")
        } 
      }

    } catch (error) {
      console.log(error);
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
                onInput={(event) => {
                  setValue("otpFirst", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(1, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(1);
                // }}
                {...register("otpFirst", {
                  required: true,
                  //   validate: isFormValid,
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
                onInput={(event) => {
                  setValue("otpSecond", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(2, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(2);
                // }}
                {...register("otpSecond", {
                  required: true,
                  //   validate: isFormValid,
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
                onInput={(event) => {
                  setValue("otpThird", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(3, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(3);
                // }}
                {...register("otpThird", {
                  required: true,
                  //   validate: isFormValid,
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
                onInput={(event) => {
                  setValue("otpFourth", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(4, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(4);
                // }}
                {...register("otpFourth", {
                  required: true,
                  //   validate: isFormValid,
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
                onInput={(event) => {
                  setValue("otpFifth", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(5, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(5);
                // }}
                {...register("otpFifth", {
                  required: true,
                  //   validate: isFormValid,
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
                onInput={(event) => {
                  setValue("otpSixth", event.target.value.replace(/\D/g, ""));
                  // onKeyUpEvent(6, event);
                }}
                // onFocus={() => {
                //   onFocusEvent(6);
                // }}
                {...register("otpSixth", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
          </div>
          <div className="row otpTimerResend">
            <div className="col-6 timer">
              {counter === 0 ? null : <>00:{counter}s</>}
            </div>
            <div className="col-6 text-right">
              {counter === 0 && (
              <a href="" className="btnLInk">
                Resend OTP
              </a>
              )}
            </div>
          </div>
          <ButtonUI type={"submit"}>
            {isLoading === true ? <Loader /> : "Verify OTP "}
            Verify OTP
          </ButtonUI>
          {/* <img src={GoogleImage} alt="horse"/> */}
        </div>
        {/* <OTPInput
      value={OTP}
      onChange={setOTP}
      autoFocus
      OTPLength={6}
      otpType="number"
      disabled={false}
      secure
    />
    <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
        {/* <ButtonUI type={"submit"} disabled={disabled}>
          submit
        </ButtonUI> */}
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
    phone: state.LandingReducer.user.phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOtpValidation: (OtpVerified) => {
      console.log("verifying dispatch",OtpVerified)
      dispatch(SET_MOBILE_OTP_VALIDATED(OtpVerified));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberOTP);
