import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import style from "./kra.module.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import ButtonUI from "../../../ui/Button.component";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const VerifyKra = () => {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [disableBtn,setdisableBtn]=useState(true);

  const checkAge = (date) => {
    let dob = date.getFullYear();
    let today = new Date().getFullYear();
    today - dob < 18 ?setdisableBtn(true):setdisableBtn(false)
  };

  const verifyDOB=async ()=>{
    const {data} = await AxiosInstance.post("/signup/kra/data/get", {
      "phone": 8369747962,
      "pan": "BFMPC9409P",
      "dob": "11/10/1997"
  }, {
      headers: {
        session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
      },
    });
   router.push("/")
  }
  

  return (
    <section className={style.formContainer}>
      <p className={style.kraHead}>Verify via KRA</p>
      <p className={style.kraSubtitle}>Confirm your details.</p>
      <DatePicker
        className="form-control"
        placeholderText="DD/MM/YY"
        onChange={(date) => {
          checkAge(date);
          setDate(date);
        }}
        selected={date}
        showPopperArrow={false}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dateFormatCalendar="MMMM"
        yearDropdownItemNumber={35}
        scrollableYearDropdown
        popperClassName="datepicker"
        popperPlacement="top-start"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, -20],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
      />
      <div className={style.SliderTip}>
        KRA is a SEBI-registered agency that keeps KYC records. If Digilocker
        verification is not possible, you must complete KRA verification to
        proceed.
      </div>
      <ButtonUI disabled={disableBtn}  onClick={verifyDOB}>
        Verify
      </ButtonUI>
      <div className={style.retry}>Retry DigiLocker e-KYC</div>
    </section>
  );
};


const mapStateToProps = (state) => {
  return {
    showModal: state.modalReducer.showModal,
    session_id: state.LandingReducer.user.session_id,
      phone: state.LandingReducer.user.phone,
      pan:state.LandingReducer.user.pan
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKra);