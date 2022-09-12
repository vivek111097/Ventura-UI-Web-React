import { useState } from "react";
import axios from "axios";

import MailOTP from "./MailOTP.component";
import MailInput from "./MailInput.component";

const MailSingUp = () => {
  const [otpSent, setotpSent] = useState(false);
  const [session, setsession] = useState("");
  const [mail, setmail] = useState("");


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
        // setsession(res.sessionid);
        setmail(res.mail);
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
        <MailOTP
          // session={session}
          mail={mail}
        />
      ) : (
        <MailInput
          mail={mail}
          setmail={setmail}
          // session={session}
          // setsession={setsession}
          otpSent={otpSent}
          setotpSent={setotpSent}
        />
      )}
    </>
  );
};

export default MailSingUp;
