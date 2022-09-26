import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Nominee.module.css";
import ReactSlider from "react-slider";

const ShareSlider = ({ handleInput, defaultvalues, disabled }) => {
  console.log(defaultvalues);
  return (
    <>
      <ReactSlider
        disabled={disabled}
        className="horizontal_slider"
        thumbClassName="example_thumb"
        trackClassName="example_track"
        defaultValue={defaultvalues}
        ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
        pearling
        onChange={(val) => {
          handleInput(val);
        }}
      />
      {/* <ul className={style.SliderNumWrap}>
        <li className={style.SliderNum}>0</li>
        <li className={style.SliderNum}>|</li>
        <li className={style.SliderNum}>20</li>
        <li className={style.SliderNum}>|</li>
        <li className={style.SliderNum}>40</li>
        <li className={style.SliderNum}>|</li>
        <li className={style.SliderNum}>60</li>
        <li className={style.SliderNum}>|</li>
        <li className={style.SliderNum}>80</li>
        <li className={style.SliderNum}>|</li>
        <li className={style.SliderNum}>100</li>
      </ul>
      <ul className={style.NomineesWrap}>
        <li className={style.Nominees}>
          <p className={style.PerOrange}>{Nominee_1_Share}%</p>
          <p className={style.NomineeNum}>Nominee 1</p>
        </li>
        <li className={style.Nominees}>
          <p className={style.PerBlue}>{Nominee_2_Share}%</p>
          <p className={style.NomineeNum}>Nominee 2</p>
        </li>
        <li className={style.Nominees}>
          <p className={style.PerGreen}>{Nominee_3_Share}%</p>
          <p className={style.NomineeNum}>Nominee 3</p>
        </li>
      </ul> */}
    </>
  );
};

export default ShareSlider;
