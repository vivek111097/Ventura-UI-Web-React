import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { STORE_SESSION } from "../../../../Redux/Landing";
import ButtonUI from "../../../ui/Button.component";
import styles from ".././Landing.module.css";

const PhoneInput = (props) => {
  const { phone, setphone, session, setsession, otpSent, setotpSent } = props;

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
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
      const getData = await fetch(
        "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/phone",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      // .then((res)=>{
      //   console.log(res)
      // }).catch((error)=>{
      //   console.log(error)
      // })

      // { "phone": 7666777118 }
      //   if (getData) {
      //     setotpSent(true);
      //   }

      //   receiving response from backend
      const res = await getData.json();
      if (res) {
        setotpSent(true);
        setsession(res.sessionid);
        setphone(res.phone);
        let UserSession = {
          sessionId: res.sessionid,
          phoneNumber: res.phone,
        };
        props.storeSession(UserSession);
      } else {
        alert("there was some error ");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="title">Ready to get started?</h2>
      <p className="subTitle">
        Enter your number to help us set up your investment account.
      </p>

      {/* Mobile Number Input Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-auto">
            <input className="form-control countryCode" defaultValue={"+91"} />
          </div>
          <div className="col">
            {/* Number Inout Field */}
            <input
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
        <div className="checkBox">
          <input
            type="checkbox"
            id="enableWhatsapp"
            defaultChecked={"checked"}
          />
          <label htmlFor="enableWhatsapp">Enable WhatsApp notifications</label>
        </div>

        {/* Submit Button */}
        <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
          Continue
        </ButtonUI>
      </form>
      <p className={styles.haveAnAccount}>
        Have an account?
        <a href=""> Login</a>
      </p>
      <p className={styles.termsOfUse}>
        By proceeding, you accept Ventura’s <strong>Terms of Use</strong> <br />
        and <strong>Privacy Policy</strong>.
      </p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    //  showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSession: (session) => dispatch(STORE_SESSION(session)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);
