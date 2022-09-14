import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { SET_EMAIL_OTP_VALIDATED } from "../../../../Redux/Landing";
import ButtonUI from "../../../ui/Button.component";
import Loader from "../../../ui/Loader/Loader.component";

const MailOTP = (props) => {
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

  // Handling THe Form on Submit Using Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
  
      // Destructuring All the Input
      const { otpFirst, otpSecond, otpThird, otpFourth, otpFifth, otpSixth } =
        data;
  
      // Storing all input in one variable
      const otp = `${otpFirst}${otpSecond}${otpThird}${otpFourth}${otpFifth}${otpSixth}`;
      const email = props.email;
      const APIData = {
        email: email,
        otp: parseInt(otp),
      };
      const getData = await AxiosInstance.post(
        "/signup/user/email/otp/verify",
        {
          ...APIData,
        },
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );

      //   receiving response from backend
      const res = await getData.data;
      if (res) {
       if(getData.status==200){
        setisLoading(false);
        props.updateOtpValidation(true);
        alert("otp verified");
        router.push("/co/welcome");
       }
      } else {
        alert("there was some error ");
      }
      console.log(res);
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
      {/* OTP Input Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container animate__animated animate__bounce">
          <h2 className="title">Enter OTP here</h2>
          <p className="subTitle">
          We have sent an OTP to your email ID  {props.email}
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

// export default MailOTP;

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
    email: state.LandingReducer.user.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOtpValidation: (isValidated) => {
      dispatch(SET_EMAIL_OTP_VALIDATED(isValidated));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailOTP);
