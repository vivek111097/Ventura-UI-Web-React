import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
  user: {
    session_id: null,
    phone: null,
    IsPhoneOTPSent: false,
    clientid: null,
    existing_user: false,
    new_user: false,
    returning_user: true,
    IsPhoneOTPValidated: false,
    email: "",
    IsEmailOTPSent: false,
    IsemailOTPValidated: false,
    pan: null,
  },
};

const Landing_slice = createSlice({
  name: "landing",
  initialState: initialState,
  reducers: {
    STORE_SESSION: (state, action) => {
      console.log(action.payload)
      const {
        session_id,
        phone,
        IsPhoneOTPSent,
        clientid,
        existing_user,
        new_user,
        returning_user,
      } = action.payload;
      const addedToUser = produce(state.user, (draft) => {
        draft.session_id = session_id;
        draft.phone = phone;
        draft.clientid = clientid;
        draft.existing_user = existing_user;
        draft.new_user = new_user;
        draft.returning_user = returning_user;
        draft.IsPhoneOTPSent = IsPhoneOTPSent;
      });
      return {
        ...state,
        user: addedToUser,
      };
    },
    
    SET_MOBILE_OTP_VALIDATED: (state, action) => {
      const  OtpVerified  = action.payload;
      console.log(OtpVerified)
      const OTPValidated = produce(state.user, (draft) => {
        draft.IsPhoneOTPValidated = OtpVerified;
      });
      return {
        ...state,
        user: OTPValidated,
      };
    },

    STORE_EMAIL: (state, action) => {
      const { email, IsEmailOTPSent } = action.payload;
      const addedToUser = produce(state.user, (draft) => {
        draft.email = email;
        draft.IsEmailOTPSent = IsEmailOTPSent;
      });
      return {
        ...state,
        user: addedToUser,
      };
    },
    STORE_PAN: (state, action) => {
      const { pan } = action.payload;
      const addedToUser = produce(state.user, (draft) => {
        draft.pan = pan;
      });
      return {
        ...state,
        user: addedToUser,
      };
    },

    SET_EMAIL_OTP_VALIDATED: (state, action) => {
      const { isvalidated } = action.payload;
      const OTPValidated = produce(state.user, (draft) => {
        draft.IsemailOTPValidated = isvalidated;
      });
      return {
        ...state,
        user: OTPValidated,
      };
    },
  },
});

export const {
  STORE_SESSION,
  SET_OTP_VALIDATED,
  SET_EMAIL_OTP_VALIDATED,
  SET_MOBILE_OTP_VALIDATED,
  STORE_EMAIL,
  STORE_PAN,
} = Landing_slice.actions;
export default Landing_slice.reducer;
