import React, { useEffect } from "react";
import axios from "axios";
const MaritalStatus = () => {
    
  const getMaritalStatus = async () => {
    try {
      const maritalStatus = await axios
        .get(
          `https://kyc-stage.ventura1.com/onboarding/v1/signup/static/user/occupations`,

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Ventura-Session-Id":"1e1f88c2-e254-40b4-adf4-b2eff154b638"
            },
          }
        )
       const response= await maritalStatus.data();
       console.log(response)
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getMaritalStatus();
  }, []);
  return <>
    <p>marital status</p>
    <p>marital status</p>
  </>;
};

export default MaritalStatus;
