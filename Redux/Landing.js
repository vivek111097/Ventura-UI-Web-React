import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer";

const initialState = {
  user: {
    session_id: null,
    phone: null,
    IsPhoneOTPSent: false,
    PhoneOTPCount:0,
    MailOTPCount:0,
    clientid: null,
    existing_user: false,
    new_user: false,
    returning_user: true,
    IsPhoneOTPValidated: false,
    email: "",
    IsEmailOTPSent: false,
    IsemailOTPValidated: false,
    IsPANValidated: false,
    pan: null,
    dob:null,
    bank_details:{
      selected_bank: null,
      selected_branch:null
    }
  },
};

const Landing_slice = createSlice({
  name: "landing",
  initialState: initialState,
  reducers: {
    STORE_SESSION: (state, action) => {
      // console.log(action.payload)
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
      // console.log(action.payload)
      const  {IsPhoneOTPValidated,returning_user}  = action.payload;
      // console.log(IsPhoneOTPValidated,returning_user)
      const OTPValidated = produce(state.user, (draft) => {
        draft.IsPhoneOTPValidated = IsPhoneOTPValidated;
        draft.returning_user = returning_user;
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
      // console.log(state)
      const { IsPANValidated,UserPANDetails} = action.payload;
      // console.log(UserPANDetails)
      const addedToUser = produce(state.user, (draft) => {
        draft.pan = UserPANDetails;
        draft.IsPANValidated = IsPANValidated;
      });
      return {
        ...state,
        user: addedToUser,
      };
    },

    STORE_DOB: (state, action) => {
      const userWithDob = produce(state.user, (draft) => {
        draft.dob = action.payload;
      });
      return {
        ...state,
        user: userWithDob,
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
    
    SET_SELECTED_BANK: (state, action) => {
      const bankName = action.payload;
      const storeBankName = produce(state.user,(draft)=>{
        draft["bank_details"].selected_bank = bankName;
      })
      return{
        ...state,
        user:storeBankName
      }
    },
    SET_SELECTED_BRANCH: (state, action) => {
      const branchName = action.payload;
      const storeBranchName = produce(state.user, (draft) => {
        draft["bank_details"].selected_branch = branchName;
      })
      return {
        ...state,
        user: storeBranchName
      }
    }
  },
});

export const {
  STORE_SESSION,
  SET_OTP_VALIDATED,
  SET_EMAIL_OTP_VALIDATED,
  SET_MOBILE_OTP_VALIDATED,
  STORE_EMAIL,
  STORE_PAN,
  STORE_DOB,
  SET_SELECTED_BANK
} = Landing_slice.actions;
export default Landing_slice.reducer;
