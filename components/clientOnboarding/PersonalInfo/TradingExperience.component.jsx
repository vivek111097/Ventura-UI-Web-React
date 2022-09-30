import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import ButtonUI from "../../ui/Button.component";
import Header from "../../global/Header.component";
import { Router, useRouter } from "next/router";
import { connect } from "react-redux";

const TradingExperience = (props) => {
  // Creating Router For Routing Purpose
  const router = useRouter();
  const [occupationList, setOccupationList] = useState([]);
  const [selectedBox, setSelectedBox] = useState();
  const [btndisabled,setBtnDisabled] = useState(true)
  const getIncomeRange = async () => {
    try {
      const getData = await AxiosInstance.get(
        "/signup/user/trading/experience",
        {
          headers: {
            session_id: props.session_id
          },
        }
      );
      console.log(getData)
      const response = await getData.data;
      setOccupationList(response.trading_experience);
    } catch (error) {
      console.log(error)
      console.log("failed");
    }
  };

  console.log(occupationList);
  useEffect(() => {
    getIncomeRange();
  }, []);

  const postTradingExp = async () => {
    try {
      const postData = await AxiosInstance.put(
        "/signup/user/politically-exposed/status/update",
        {
          phone: props.phone,
          exposed: "relatively",
          exp_id: parseInt(selectedBox),
        },
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
        router.push("/co/bank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    setSelectedBox(event.target.value);
    setBtnDisabled(false)
  }

  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(`political: ${data.get("political")}`);
    console.log(selectedBox);
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
          <h2 className="title">Your trading experience</h2>
          <p className="subTitle">
            These details are required by SEBI to open your demat account.
          </p>
          <div className="radioGroupMain">
            {occupationList.map((list, index) => {
              return (
                <div className="radio-group" key={list.exp_id}>
                  <input
                    id={list.value}
                    name="hungry"
                    type="radio"
                    value={list.exp_id}
                    onChange={handleChange}
                  />
                  <label htmlFor={list.value}>{list.value}</label>
                </div>
              );
            })}
          </div>
          <form onSubmit={onSubmit}>
            <div className="checkBox  animate__animated ">
              <input
                type="checkbox"
                name="political"
                id="politicallyExposed"
                defaultChecked={true}
              />
              <label htmlFor="politicallyExposed">
                I am not a politically exposed person
              </label>
            </div>
            <div className="animate__animated ">
              <ButtonUI type={"submit"} onClick={postTradingExp}  disabled={btndisabled}>
                Continue
              </ButtonUI>
            </div>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(TradingExperience);

