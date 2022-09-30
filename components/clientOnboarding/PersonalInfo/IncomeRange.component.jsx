import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import Header from "../../global/Header.component";
import { useRouter } from "next/router";
import { connect } from "react-redux";


const IncomeRange = (props) => {
   // Creating Router For Routing Purpose
   const router = useRouter();
  const [incomeRangeList, setincomeRangeList] = useState([]);
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/static/user/income-range",
        {
          headers: {
            session_id: props.session_id,
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


  const postAnnualIncome = async (status) => {
    var data = {
      "phone": props.phone,
      "income-range": parseInt(status),
    };

    try {
      const postData = await AxiosInstance.put(
        "/signup/user/income-range/update",
        data,
        {
          headers: {
            session_id: props.session_id,
          },
        }
      );
      console.log(postData);
      const response = await postData.data;
      console.log(response);
      if (postData.status == 200) {
        router.push("/co/personalInfo/tradingExperience");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    postAnnualIncome(event.target.value);
    // console.log(event.target.value)
  }
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
                  value={list.income_range_id_incr}
                  onChange={handleChange}
                />
                <label htmlFor={list.income_range_id_incr}>
                  {list.income_range_type}
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};



const mapStateToProps = (state) => {
  return {
    phone: state.LandingReducer.user.phone,
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeRange);
