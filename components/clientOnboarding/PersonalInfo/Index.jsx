import React, { useEffect, useState } from "react";
import Header from "../../../global/Header.component";
import MaritalStatus from "./MaritalStatus.component";
import IncomeRange from "./IncomeRange.component";
import Occupation from "./Occupation.component";
import TradingExperience from './TradingExperience.component';

const PersonalInfoMain = () => {
  const [maritalStatusView, setMaritalStatusView] = useState(false);
  return (
    <>
      <Header />
      <section className="ContainerBG">
        <div className="bgtop">
          <img src="/images/welcomebgtop.png" />
        </div>
        <div className="bgbottom">
          <img src="/images/welcomebgbottom.png" />
        </div>
        <div className="containerMini">

          {/* {maritalStatusView ? (
            <MaritalStatus />
          ) : (
            <IncomeRange />
          )} */}
          <TradingExperience />
          {/* <Occupation />*asyup */}

        </div>
      </section>
    </>
  );
};

export default PersonalInfoMain;
