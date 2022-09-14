import { useState } from "react";
import axios from "axios";

import NumberOTP from "./NumberOTP.component";
import NumberInput from "./NumberInput.component";
import EnterPanComponent from "../VerifyPAN/EnterPan.component";
import { connect } from "react-redux";

const SingUpNumber = () => {
  const [otpSent, setotpSent] = useState(false);

  return (
    <>
      {/* Using Ternary Operator to Toggle OTP And Input Field  */}

      {otpSent ? (
        <NumberOTP />
      ) : (
        <NumberInput otpSent={otpSent} setotpSent={setotpSent} />
      )}
    </>
  );
};

export default SingUpNumber;

// const mapStateToProps = (state) => {
// console.log(state)
//   return {
//     IsPhoneotpSent: state.LandingReducer.IsPhoneotpSent
//   };
// };

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     storeSession: (session) => dispatch(STORE_SESSION(session)),
// //   };
// // };

// export default connect(mapStateToProps)(SingUpNumber);
