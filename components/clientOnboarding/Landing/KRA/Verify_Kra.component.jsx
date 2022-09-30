
import "react-datepicker/dist/react-datepicker.css";
import style from "./kra.module.css";
import DatePicker from "react-datepicker";
import React,{ useState } from "react";
import ButtonUI from "../../../ui/Button.component";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { STORE_DOB } from "../../../../Redux/Landing";

const VerifyKra = (props) => {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [disableBtn,setdisableBtn]=useState(true);

  const handalDigiLocker=()=>{
    router.push('co/kyc')
  }

  const checkAge = (date) => {
    let dob = date.getFullYear();
    let today = new Date().getFullYear();
    today - dob < 18 ?setdisableBtn(true):setdisableBtn(false)
  };

  const HandalVerifyDOB=async ()=>{
    router.push('kra/kra-details')
  }
  

  return (
    <section className={style.formContainer}>
      <p className={style.kraHead}>Verify via KRA</p>
      <p className={style.kraSubtitle}>Confirm your details.</p>
      <DatePicker
        className="form-control"
        placeholderText="DD/MM/YY"
        onChange={(date) => {
          console.log(date)
          checkAge(date);
          setDate(date);
          props.storeDob(new Date(date).toLocaleDateString("es-CL").replace(/-/g, "/").toString())
        }}
        selected={date}
        showPopperArrow={false}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        dateFormatCalendar="MMMM"
        yearDropdownItemNumber={100}
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
      <ButtonUI disabled={disableBtn}  onClick={HandalVerifyDOB}>
        Verify
      </ButtonUI>
      <div className={style.retry} onClick={handalDigiLocker}>Retry DigiLocker e-KYC</div>
    </section>
  );
};


const mapStateToProps = (state) => {
  return {
    showModal: state.modalReducer.showModal,
    session_id: state.LandingReducer.user.session_id,
      phone: state.LandingReducer.user.phone,
      pan:state.LandingReducer.user.pan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(TOGGLE_MODAL()),
    storeDob:(dob)=>dispatch(STORE_DOB(dob))
    
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKra);