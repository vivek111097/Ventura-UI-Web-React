import React from "react";
import NumberSignUpCard from "./MobileSignUp/NumberSignUpCard.component"
import MailSignUpCard from "./MailSingUp/MailSignUpCard.component"
const Right = () => {
  return (
    <>
    <NumberSignUpCard/>
    {/* <MailSignUpCard/> */}
    </>
  );
};

export default Right;
// const RenderComponent = () => {
//   if (state.phoneOTPVerified === true) {
//     return <MailSignUpCard />;
//   } else {
//     return <NumberSignUpCard />;
//   }
// };