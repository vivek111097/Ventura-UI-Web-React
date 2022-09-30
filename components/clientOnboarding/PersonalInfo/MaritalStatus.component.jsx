import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import Header from "../../global/Header.component";
import { Router, useRouter } from "next/router";
import { connect } from "react-redux";

const MaritalStatus = (props) => {
  // Creating Router For Routing Purpose
  const router = useRouter();
  const [selected, setSelected] = useState();
  const [MaritalList, setMaritalList] = useState([]);
  const getMaritalStatus = async () => {
    try {
      console.log(props.session_id)
      const getData = await AxiosInstance.get("/signup/user/marital-status", {
        headers: {
          session_id: props.session_id||"82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
        },
      });
      const response = await getData.data;
      setMaritalList(response.marital_list);
      console.log(response);
    } catch (error) {
      // alert(error.response.data.message);
    }
  };

  // https://kyc-stage.ventura1.com/onboarding/v2/signup/user/marital-status

  useEffect(() => {
    getMaritalStatus();
  }, []);

  const postMaritalStatus = async (status) => {
    var data = {
      phone: props.phone,
      marital_status: status,
    };

    try {
      const postData = await AxiosInstance.put(
        "/signup/user/marital-status/update",
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
        router.push("/co/personalInfo/occupation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    setSelected(event.target.value);
    postMaritalStatus(event.target.value);
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

export default connect(mapStateToProps, mapDispatchToProps)(MaritalStatus);

