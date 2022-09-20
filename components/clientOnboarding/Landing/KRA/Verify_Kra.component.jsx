import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import style from "./kra.module.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import ButtonUI from "../../../ui/Button.component";
import { useRouter } from 'next/router'

const VerifyKra = () => {
  const router = useRouter()
  const [date, setDate] = useState(null);
  return (
    <section className={style.formContainer}>
      <p className={style.kraHead}>Verify via KRA</p>
      <p className={style.kraSubtitle}>Confirm your details.</p>
      <DatePicker
        className="form-control"
        placeholderText="DD/MM/YY"
        onChange={(date) => setDate(date)}
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
      <ButtonUI onClick={()=>router.push("/")}  disabled={false}>Verify</ButtonUI>
      <div className={style.retry}>Retry DigiLocker e-KYC</div>
    </section>
  );
};

export default VerifyKra;
