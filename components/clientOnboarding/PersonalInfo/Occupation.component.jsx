import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import Header from "../../global/Header.component";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Occupation = (props) => {
  // Creating Router For Routing Purpose
  const router = useRouter();
  const [occupationList, setOccupationList] = useState([]);
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/static/user/occupations",
        {
          headers: {
            session_id: props.session_id,
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

  const postOccuptionStatus = async (status) => {
    var data = {
      phone: props.phone,
      occupation: parseInt(status),
    };

    try {
      const postData = await AxiosInstance.put(
        "/signup/user/occupation/update",
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
        router.push("/co/personalInfo/annualIncome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    postOccuptionStatus(event.target.value);
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
                  value={list.occupation_detail_id_incr}
                  onChange={handleChange}
                />
                <label htmlFor={list.occupation_type}>
                  {list.occupation_type}
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

export default connect(mapStateToProps, mapDispatchToProps)(Occupation);
