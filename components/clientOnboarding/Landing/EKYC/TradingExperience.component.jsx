import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";
import ButtonUI from "../../../ui/Button.component";

const TradingExperience = () => {
  const [occupationList, setOccupationList] = useState([]);
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/user/trading/experience",
        {
          headers: {
            session_id: "bc693998-bf62-4193-b859-be7003cda053",
          },
        }
      );
      const response = await getData.data;
      setOccupationList(response.trading_experience);
    } catch (error) {
      console.log("failed");
    }
  };

  console.log(occupationList);
  useEffect(() => {
    getIncomeRange();
  }, []);

  function handleChange(event) {
    console.log(event.target.value);
  }
  return (
    <>
      <h2 className="title">Your trading experience</h2>
      <p className="subTitle">
        These details are required by SEBI to open your demat account.
      </p>
      <div className="radioGroupMain">
        {occupationList.map((list, index) => {
          return (
            <div className="radio-group" key={list.exp_id}>
              <input
                id={list.value}
                name="hungry"
                type="radio"
                value={list.value}
                onChange={handleChange}
              />
              <label htmlFor={list.value}>{list.value}</label>
            </div>
          );
        })}
      </div>
      <div className="checkBox  animate__animated ">
        <input
          type="checkbox"
          id="politicallyExposed"
          defaultChecked={"checked"}
        />
        <label htmlFor="politicallyExposed">
          I am not a politically exposed person
        </label>
      </div>
      <div className="animate__animated ">
        <ButtonUI type={"submit"}>Continue</ButtonUI>
      </div>
    </>
  );
};

export default TradingExperience;
