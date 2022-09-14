import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import axios from "axios";

import { STORE_SESSION } from "../../../../Redux/Landing";
import UseAxios from "../../../global/hooks/useAxios";
import ButtonUI from "../../../ui/Button.component";
import Loader from "../../../ui/Loader/Loader.component";
import styles from ".././Landing.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";

const NumberInput = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const { otpSent, setotpSent } = props;

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
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
          phone: sessionRes.phone,
        IsPhoneOTPSent: true,
          clientid: res.clientid,
          existing_user: res.existing_user,
          new_user: res.new_user,
          returning_user: res.returning_user,
      };
      props.storeSession(UserSession);
      }
      else {
        console.log("hello saif");
      }
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
                setValue("phone", parseInt(e.target.value.replace(/\D/g, "")));
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
            {...register("enableWhatsapp")}
            defaultChecked={"checked"}
          />
          <label htmlFor="enableWhatsapp">Enable WhatsApp notifications</label>
        </div>

        {/* Submit Button */}
        <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
       {/* {isLoading===true ? (<Loader/> ):    "Continue " } */}
       Continue
        </ButtonUI>
      </form>
      <p className={styles.haveAnAccount}>
        Have an account?
        <a href=""> Login</a>
      </p>
      <p className={styles.termsOfUse}>
        By proceeding, you accept Ventura’s <a href="">Terms of Use</a> <br />
        and <a href="">Privacy Policy</a>.
      </p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumberInput);
