import React from "react";
import NumberSignUpCard from "./MobileSignUp/NumberSignUpCard.component";
import MailSignUpCard from "./MailSingUp/MailSignUpCard.component";
import { connect } from "react-redux";
import Occupation from "./EKYC/Occupation.component";
const Right = (props) => {
  // console.log(props.IsPhoneOTPValidated);
  const ToggleComponents=()=>{
    if(props.IsPhoneOTPValidated===true){
     return <MailSignUpCard />
    }else{
      return <NumberSignUpCard/>
    }
  }
  return (
    <>
    {/* {props.IsPhoneOTPValidated==true ? <MailSignUpCard /> : <NumberSignUpCard />} */}
    <ToggleComponents/>
    </>
  );
};


const mapStateToProps = (state) => {
  console.log(state);
  return {
    IsPhoneOTPValidated: state.LandingReducer.user.IsPhoneOTPValidated,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    storeSession: (session) => dispatch(STORE_SESSION(session)),
  };
};

export default connect(mapStateToProps)(Right);
