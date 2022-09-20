import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";
import IncomeRagnge from "./IncomeRange.component";

const Occupation = () => {
  const [occupationList, setOccupationList] = useState([]);
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/static/user/occupations",
        {
          headers: {
            session_id: "2395a076-e0df-4827-adfd-912b8b46e40a",
          },
        }
      );
      const response = await getData.data;
      setOccupationList(response.occupations);
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
      <h2 className="title">Your occupation</h2>
      <p className="subTitle">
        These details are required by SEBI to open your demat account.
      </p>
      {occupationList.map((list, index) => {
        return (
          <div className="radio-group" key={list.occupation_detail_id_incr}>
            <input
              id={list.occupation_type}
              name="hungry"
              type="radio"
              value={list.occupation_type}
              onChange={handleChange}
            />
            <label htmlFor={list.occupation_type}>{list.occupation_type}</label>
          </div>
        );
      })}
    </>
  );
};

export default Occupation;
