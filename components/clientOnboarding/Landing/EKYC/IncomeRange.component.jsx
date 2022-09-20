import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";
import IncomeRagnge from "./IncomeRange.component";

const IncomeRange = () => {
  const [incomeRangeList, setincomeRangeList] = useState([]);
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/static/user/income-range",
        {
          headers: {
            session_id: "2395a076-e0df-4827-adfd-912b8b46e40a",
          },
        }
      );
      const response = await getData.data;
      // console.log(response);
      setincomeRangeList(response.income_range);

      // console.log(setincomeRangeList);
    } catch (error) {
      // console.log(error.response.data.message);
      console.log("failed");
    }
  };

  console.log(incomeRangeList);
  useEffect(() => {
    getIncomeRange();
  }, []);

  function handleChange(event) {
    console.log(event.target.value);
  }
  return (
    <>
      <h2 className="title">Your annual income</h2>
      <p className="subTitle">
      These details are required by SEBI to open your demat account.
      </p>
      {incomeRangeList.map((list, index) => {
        return (
          <div className="radio-group" key={list.income_range_id_incr}>
            <input
              id={list.income_range_id_incr}
              name="hungry"
              type="radio"
              value={list.income_range_type}
              onChange={handleChange}
            />
            <label htmlFor={list.income_range_id_incr}>
              {list.income_range_type}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default IncomeRange;
