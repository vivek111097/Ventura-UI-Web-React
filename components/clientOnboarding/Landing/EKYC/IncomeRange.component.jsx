import React, { useEffect, useState } from 'react';

const IncomeRagnge = () => {

    const [incomeRange, setincomeRange] = useState([])

    const getIncomeRange = async () => {
        try {
          const maritalStatus = await axios
            .get(
              `https://kyc-stage.ventura1.com/onboarding/v1/signup/static/user/income-range`,
    
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/x-www-form-urlencoded",
                  "X-Ventura-Session-Id":"1e1f88c2-e254-40b4-adf4-b2eff154b638"
                },
              }
            )
           const response= await maritalStatus.data();
              setincomeRange([...response])
           console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
     
      const displayIncomeRange=incomeRange.map((item,index)=>{
        console.log(item)
      })
      
      useEffect(() => {
        getIncomeRange();
      }, []);
  return (
    <>
{incomeRange.length===0? <p>List Loading</p>: displayIncomeRange }
      <p>this is Income Range List</p>
      <p>this is Income Range List</p>
    </>
  );
}

export default IncomeRagnge;
