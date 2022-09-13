import { useState } from "react";
import axios from "axios";

import NumberOTP from "./NumberOTP.component";
import NumberInput from "./NumberInput.component";
import EnterPan from "../VerifyPAN/EnterPan.component";

const SingUpNumber = () => {
  const [otpSent, setotpSent] = useState(false);
  const [session, setsession] = useState("");
  const [phone, setphone] = useState("");

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
      {/* Using Ternary Operator to Toggle OTP And Input Field  */}
      
      {otpSent ? (
         <NumberOTP/>
       
      ) : (
          <EnterPan/>
        // <NumberInput
        //   phone={phone}
        //   setphone={setphone}
        //   session={session}
        //   setsession={setsession}
        //   otpSent={otpSent}
        //   setotpSent={setotpSent}
        // />
      )}
    </>
  );
};

export default SingUpNumber;
