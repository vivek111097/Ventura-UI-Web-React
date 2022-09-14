import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Header from "../../../global/Header.component";
import ButtonUI from "../../../ui/Button.component";
import styles from "./Pan.module.css";

const EnterPan = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // Defining Regex for PAN Number
  const PANRegex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);

  // Defining Regex for Individuals PAN Number
  const IndividualPANRegex = new RegExp(
    /^([a-zA-Z]){3}([pP]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/
  );

  // Validating PAN Number
  const validatePAN = (pan) => {
    console.log(pan);
    // Checking If PAN is Valid or Not
    if (PANRegex.test(pan)) {
      // Checking If Individual PAN is Valid or Not
      if (IndividualPANRegex.test(pan)) {
        return true;
      } else {
        // return error message if string is not valid
        return "Only Individuals pan is allowed ,so 4th letter should be P";
      }
    } else {
      return "Invalid PAN Card "; //return false for valid string
    }
  };

  // Sending Data to API Using Async Await
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const getData = fetch(
        "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/pan/verify",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "X-Ventura-Session-Id": props.sessionId,
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      //   receiving response from backend

      // const res = await getData.json();
      // if (res) {
      //   setotpSent(true);
      //   setsession(res.sessionid);
      //   setphone(res.phone);
      // } else {
      //   alert("there was some error ");
      // }
      // console.log(res);
      reset();
    } catch (error) {
      // Error If Something Goes Wrong
      console.log(error);
    }
  };

  console.log(errors);
  return (
    <>
      <Header />
      {/* PAN Form */}
      <section className="ContainerBG">
        <div className="bgtop">
          <img src="/images/welcomebgtop.png" />
        </div>
        <div className="bgbottom">
          <img src="/images/welcomebgbottom.png" />
        </div>

        <div className="containerMini">
          <h2 className="title">Enter your PAN</h2>
          <p className="subTitle">
            These details are required by SEBI to open your demat account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* PAN Number Input */}
            <input
              type="text"
              className="form-control"
              id="pan"
              placeholder="Enter PAN"
              maxLength={10}
              {...register("pan", {
                required: "PAN Number is required",
                validate: validatePAN,
                maxLength: {
                  value: 10,
                  message: "Maximum 10 number",
                },
              })}
              onKeyUp={(e) => {
                setValue("pan", e.target.value.toLocaleUpperCase());
                trigger("pan");
              }}
            />
            {/* {errors.panNumber && (
                  <small className="form-text text-danger">
                    {errors.panNumber.message}
                  </small>
                )} */}

            {/* Submit Button */}
            <div className="checkBox duelLine">
              <input
                type="checkbox"
                id="enableWhatsapp"
                defaultChecked={"checked"}
              />
              <label htmlFor="enableWhatsapp">
                  I’m a tax resident of India and not paying taxes to any other
                  jurisdiction(s). 
                  <a>Know more</a>
              </label>
            </div>
            <div className={styles.note}>
              Your account would be opened as per your PAN card details. Please
              use the Offline Account Opening Form if you are looking to open an
              HUF, Corporate, Partnership, Joint or NRI account.
            </div>
            <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
              Continue
            </ButtonUI>
          </form>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    sessionId: state.LandingReducer.user.sessionid,
    sessionId: state.LandingReducer.user.sessionid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setOtpValidation: (isValidated) => dispatch(SET_OTP_VALIDATED(isValidated)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPan);
