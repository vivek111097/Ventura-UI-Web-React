import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { STORE_EMAIL } from "../../../../Redux/Landing";
import ButtonUI from "../../../ui/Button.component";
import Loader from "../../../ui/Loader/Loader.component";
import styles from ".././Landing.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";

const MailInput = (props) => {
  const [isLoading, setisLoading] = useState(false)
  const {otpSent, setotpSent } = props;
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // Defining Regex for Email
  const MailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //   Email Validation
  const validateEmail = (email) => {
    if (MailRegex.test(email)) {
      return true;
    } else {
      return "Invalid Email ID";
    }
  };

  // Handling Form  on Submit USing Async Await
  const onSubmit = async (data) => {
    try {
setisLoading(true)
      // Sending data to API
      const APIData = {
        email: (data.email),
      };
      console.log(APIData);
      const getData = await AxiosInstance.post("/signup/user/email", {
        ...APIData,
      });
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
      const res = await getData.data;
      if (res) {
        setotpSent(true);
        setisLoading(false);
        // IsEmailOTPSent
        let MailData = {
          email: data.email,
          IsEmailOTPSent: true,
        };
      props.setEmail(MailData)
      } else {
        alert("there was some error ");
      }
      console.log(res);
    } catch (error) {

      // Error IF Something Goes Wrong
      console.log(error);
    }
  };

  return (
    <>

<h2 className="title">Add your email</h2>
      <p className="subTitle">
      This is where we�ll send you important updates and insights on the market.
      </p>
      {/* Email Form  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
          
         
            {/* Defining Email Input */}
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
              {...register("email", {
                required: "Email is required",
                validate: validateEmail,
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
          </div>
        </div>

    

        {/* Submit BUtton */}
        <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
        {isLoading===true ? (<Loader/> ):    "Verify Email " }
        </ButtonUI>
        <div className={styles.or}>OR</div>
        <ButtonUI type={"submit"}>
        {isLoading===true ? (<Loader/> ):    `Continue with Google  ${<googleImage/>}` }
        </ButtonUI>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail:(email)=>dispatch(STORE_EMAIL(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailInput);
