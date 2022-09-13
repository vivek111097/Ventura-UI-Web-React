import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
  user: {
    sessionid: null,
    phonenumber: "",
    IsPhoneOTPValidated: false,
  },
};

const Landing_slice = createSlice({
  name: "landing",
  initialState: initialState,
  reducers: {
    STORE_SESSION: (state, action) => {
      const { sessionId, phoneNumber } = action.payload
      const addedTouser = produce(state.user, (draft) => {
        draft.sessionid=sessionId
        draft.phonenumber=phoneNumber
      });
      return {
        ...state,
        user: addedTouser,
      };
    },
    // STORE_NUMBER: (state, action) => {
    //   const { sessionId, phoneNumber } = action.payload
    //   const addedTouser = produce(state.user, (draft) => {
    //     draft.sessionid=sessionId
    //     draft.phonenumber=phoneNumber
    //   });
    //   return {
    //     ...state,
    //     user: addedTouser,
    //   };
    // },

    SET_OTP_VALIDATED:(state, action)=>{
      const { isvalidated } = action.payload
      const OTPValidated = produce(state.user, (draft) => {
        draft.IsPhoneOTPValidated = isvalidated
      });
      return {
        ...state,
        user: OTPValidated,
      };
    }

  },
});

export const { STORE_SESSION,SET_OTP_VALIDATED } = Landing_slice.actions;
export default Landing_slice.reducer;
