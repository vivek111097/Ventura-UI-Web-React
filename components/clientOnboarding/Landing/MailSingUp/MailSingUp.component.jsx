import { useState } from "react";
import axios from "axios";

import MailOTP from "./MailOTP.component";
import MailInput from "./MailInput.component";

const MailSingUp = () => {
  const [otpSent, setotpSent] = useState(false);
  const [session, setsession] = useState("");
  const [mail, setmail] = useState("");


  return (
    <>
    {/* Using Ternary Operator to Toggle OTP And Input Field  */}
    
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
