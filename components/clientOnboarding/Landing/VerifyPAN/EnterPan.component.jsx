import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import ButtonUI from "../../../ui/Button.component";

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

      {/* PAN Form */}
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
          onKeyUp={() => {
            setValue("pan",e.target.value.toLocaleUpperCase())
            trigger("pan");
          }}
        />
        {/* {errors.panNumber && (
                  <small className="form-text text-danger">
                    {errors.panNumber.message}
                  </small>
                )} */}

        {/* Submit Button */}
        <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
          Continue
        </ButtonUI>
      </form>
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
