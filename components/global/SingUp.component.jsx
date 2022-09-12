import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonUI from "../ui/Button.component";
import OTP from "./OTP.component";
const SingUp = () => {
  const [disabled, setdisabled] = useState(true);
  const [otpSent, setotpSent] = useState(false);
  const [session, setsession] = useState("");
  const [phone, setphone] = useState("");
  const {
    register,
    trigger,
    setValue,

    handleSubmit,
    formState: { errors },
  } = useForm();

  // Defining Regex for mobile number
  const phoneNumberRegex = new RegExp(/^[6-9]\d{9}$/i);

  //   Number Validation
  const validatePhoneEmail = (phone) => {
    if (phoneNumberRegex.test(phone)) {
      //   enabling the button if mobile number is valid
      setdisabled(false);
      return true;
    } else {
      setdisabled(true);
      return "Invalid Input";
    }
  };

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
      {otpSent ? (
        <OTP session={session} phone={phone} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-auto">
              <input className="form-control countryCode" defaultValue={+91} />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Enter mobile number"
                name="phone"
                maxLength={10}
                {...register("phone", {
                  required: true,
                  validate: validatePhoneEmail,
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
          <div className="checkBox">
            <input type="checkbox" id="enableWhatsapp" defaultChecked={"checked"} />
            <label htmlFor="enableWhatsapp">Enable WhatsApp notifications</label>
          </div>
          <ButtonUI type={"submit"} disabled={disabled}>
            Continue
          </ButtonUI>
        </form>
      )}
      
    </>
  );
};

export default SingUp;
