import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";

const MaritalStatus = () => {
  const [MaritalList, setMaritalList] = useState([]);
  const getMaritalStatus = async () => {
    try {
      const getData = await AxiosInstance.get("/signup/user/marital-status", {
        headers: {
          session_id: "2395a076-e0df-4827-adfd-912b8b46e40a",
        },
      });
      const response = await getData.data;
      setMaritalList(response.marital_list);
      console.log(response);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // https://kyc-stage.ventura1.com/onboarding/v2/signup/user/marital-status

  useEffect(() => {
    getMaritalStatus();
  }, []);

  function handleChange(event) {
    console.log(event.target.value);
  }
  return (
    <>
      <h2 className="title">Your marital status</h2>
      <p className="subTitle">
        These details are required by SEBI to open your demat account.
      </p>
      {MaritalList.map((list, index) => {
        return (
          <div className="radio-group" key={index}>
            <input
              id={list}
              name="hungry"
              type="radio"
              value={list}
              onChange={handleChange}
            />
            <label htmlFor={list}>{list}</label>
          </div>
        );
      })}
    </>
  );
};

export default MaritalStatus;
