import React, { useEffect, useState } from 'react';

const Occupation = () => {

    const [occupationlist, setoccupationlist] = useState([])

    const getOccupationList = async () => {
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
              setoccupationlist([...response])
           console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
     
      const displayOccupationList=occupationlist.map((item,index)=>{
        console.log(item)
      })
      
      useEffect(() => {
        getOccupationList();
      }, []);
  return (
    <>
{occupationlist.length===0? <p>List Loading</p>: displayOccupationList }
      <p>this is occupation</p>
      <p>this is occupation</p>
    </>
  );
}

export default Occupation;
