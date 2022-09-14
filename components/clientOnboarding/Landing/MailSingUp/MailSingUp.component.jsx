import { useState } from "react";
import axios from "axios";

import MailOTP from "./MailOTP.component";
import MailInput from "./MailInput.component";

const MailSingUp = () => {
  const [otpSent, setotpSent] = useState(false);


  return (
    <>
    {/* Using Ternary Operator to Toggle OTP And Input Field  */}
    
      {otpSent ? (
        <MailOTP
        />
      ) : (
        <MailInput otpSent={otpSent} setotpSent={setotpSent}/>
      )}
    </>
  );
};

export default MailSingUp;
