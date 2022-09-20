import React, { useEffect, useState } from "react";
import axios from "axios";
import AxiosInstance from "../../../../Api/Axios/axios";
const MaritalStatus = () => {
    const [MaritalList, setMaritalList] = useState([])
  const getMaritalStatus = async () => {
    try {
      const getData = await AxiosInstance.post("/signup/user/marital-status", {
        ...APIData,
      });
      
       const response= await getData.data();
       console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  // https://kyc-stage.ventura1.com/onboarding/v2/signup/user/marital-status

  useEffect(() => {
    getMaritalStatus();
  }, []);
  return <>
    <p>marital status</p>
    <p>marital status</p>
    <div className="selection">
    <input id="burger" name="hungry" type="radio" />
    <label htmlFor="burger">Burger + Chips</label>
  </div>
  </>;
};

export default MaritalStatus;
