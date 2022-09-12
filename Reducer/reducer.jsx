export const initialState = {
  phone: "",
  sessionID: null,
  isOtpSent:false,
  phoneOTP: "",
  phoneOTPVerified:false ,
  email: "",
  emailOTP: "",
  mailOTPVerified:false,
  PAN: "",
  Aadhaar: "",
};
export const reducer = (state, action) => {
  console.log("inside the reducer", state.phone);
  console.log(action);
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "verifyNumber") {
    return {
        phone: action.payload[0],
      sessionID: action.payload[1]
    };
  }
  if (action.type === "otpSent") {
    return {
        isOtpSent: action.payload
    };
  }
  if (action.type === "MobileOTPVerified") {
    return {
        phoneOTPVerified: action.payload
    };
  }
//   if (action.type === "MailOTPVerified") {
//     return {
//         mailOTPVerified: action.payload
//     };
//   }
//   if (action.type === "number") {
//     return {
//         phone: action.payload[0],
//       sessionID: action.payload[1]
//     };
//   }

  return state;
};
