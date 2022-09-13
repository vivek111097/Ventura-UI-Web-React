import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import ButtonUI from "../../../ui/Button.component";

const MailInput = ({ email, setemail, otpSent, setotpSent }) => {
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

      // Sending data to API
      const getData = await fetch(
        "https://kyc-stage.ventura1.com/onboarding/v1/signup/user/email",
        {
          method: "POST",
          headers: {
            "X-Ventura-Session-Id": email,
          },
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
        setemail(res.mail);
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
          Continue
        </ButtonUI>
      </form>
    </>
  );
};

export default MailInput;
