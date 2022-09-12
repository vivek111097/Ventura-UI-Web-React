import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonUI from "../../../ui/Button.component";
import { connect } from "react-redux";
import { SET_OTP_VALIDATED } from "../../../../Redux/Landing";


const NumberOTP = (props) => {
  const { session, phone } = props;
  console.log(session);
  const [disabled, setdisabled] = useState(true);
  const {
    register,
    trigger,
    setValue,

    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  function getCodeBoxElement(index) {
    return document.getElementById("codeBox" + index);
  }
  function onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    if (getCodeBoxElement(index).value.length === 1) {
      if (index !== 6) {
        getCodeBoxElement(index + 1).focus();
      } else {
        // var ele = document.getElementById("codeBox" + index)
        // for (var p of Array.from(ele)) {
        //   console.log(p)
        //   console.log("hello")
        //   }
        setdisabled(false);
      }
    }
    if (eventCode === 8 && index !== 1) {
      getCodeBoxElement(index - 1).focus();
    }
  }
  function onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = getCodeBoxElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }
  //   const isFormValid = ({ codeBox1, codeBox2, codeBox3, codeBox4 }) => {
  //     // const {codeBox1,codeBox2,codeBox3,codeBox4}=data
  //     if (codeBox1 || codeBox2 || codeBox3 || codeBox4) {
  //       setdisabled(flase);
  //     }
  //     // const otp=`${codeBox1}${codeBox2}${codeBox3}${codeBox4}`
  //   };
  const onSubmit = async (data) => {
    const { codeBox1, codeBox2, codeBox3, codeBox4, codeBox5, codeBox6 } = data;
    const otp = `${codeBox1}${codeBox2}${codeBox3}${codeBox4}${codeBox5}${codeBox6}`;
    try {
      console.log(data.otp);
      const getData = await fetch(
        "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/phone/otp/verify",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "X-Ventura-Session-Id": session,
          },
          body: JSON.stringify({
            phone: phone,
            otp: otp,
          }),
        }
      )
      .then((res) => {
        props.updateOtpValidation(true);
        alert("otp verified successfully");
        console.log(res);
      // dispatch({type:"MobileOTPVerified",payload:true})
      })
      .catch((error) => {
        console.log(error);
      });

      // { "phone": 7666777118 }
      //   if (getData) {
      //     setotpSent(true);
      //   }

      //   receiving response from backend
      // const res = await getData.json();
      // if (res) {
      //   alert("top verified");
      //   router.push("/co/welcome");
      // } else {
      //   alert("there was some error ");
      // }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container animate__animated animate__bounce">
          <h2 className="title">OTP sent</h2>
          <p className="subTitle">
            We have sent an OTP to your mobile number +91-919286xxxx.
          </p>
          <div className="enterOTP row">
            <div className="col-2">
              <input
                className="otp"
                id="codeBox1"
                type="text"
                onInput={(event) => {
                  setValue("codeBox1", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(1, event);
                }}
                onFocus={() => {
                  onFocusEvent(1);
                }}
                {...register("codeBox1", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
            <div className="col-2">
              <input
                className="otp"
                id="codeBox2"
                type="text"
                onInput={(event) => {
                  setValue("codeBox2", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(2, event);
                }}
                onFocus={() => {
                  onFocusEvent(2);
                }}
                {...register("codeBox2", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
            <div className="col-2">
              <input
                className="otp"
                id="codeBox3"
                type="text"
                onInput={(event) => {
                  setValue("codeBox3", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(3, event);
                }}
                onFocus={() => {
                  onFocusEvent(3);
                }}
                {...register("codeBox3", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
            <div className="col-2">
              <input
                className="otp"
                id="codeBox4"
                type="text"
                onInput={(event) => {
                  setValue("codeBox4", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(4, event);
                }}
                onFocus={() => {
                  onFocusEvent(4);
                }}
                {...register("codeBox4", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
            <div className="col-2">
              <input
                className="otp"
                id="codeBox5"
                type="text"
                onInput={(event) => {
                  setValue("codeBox5", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(5, event);
                }}
                onFocus={() => {
                  onFocusEvent(5);
                }}
                {...register("codeBox5", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
            <div className="col-2">
              <input
                className="otp"
                id="codeBox6"
                type="text"
                onInput={(event) => {
                  setValue("codeBox6", event.target.value.replace(/\D/g, ""));
                  onKeyUpEvent(6, event);
                }}
                onFocus={() => {
                  onFocusEvent(6);
                }}
                {...register("codeBox6", {
                  required: true,
                  //   validate: isFormValid,
                })}
                maxLength={1}
              />
            </div>
          </div>
          <div className="row otpTimerResend">
            <div className="col-6 timer">0:53s</div>
            <div className="col-6 text-right">
              <a href="" className="btnLInk">
                Resend OTP
              </a>
            </div>
          </div>
          <ButtonUI type={"submit"} disabled={disabled}>
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

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOtpValidation:(isValidated)=>{dispatch(SET_OTP_VALIDATED(isValidated))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberOTP);
