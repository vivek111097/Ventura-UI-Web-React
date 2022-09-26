import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import style from "./NomineeList.module.css";
import { connect } from 'react-redux';

const NomineeListItem = () => {
  const [nomineeList, setNomineeList] = useState([]);
  useEffect(() => {
    try {
      const getNomineeList = async () => {
        const { data } = await AxiosInstance.post(
          "/signup/user/nominee/details",
          { phone: 8369747962 },
          // { phone: props.phone },
          {
            headers: {
              session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
              // session_id: props.session_id,
            },
          }
        );
        console.log(data);
        setNomineeList(data.nominee_data);
      };
      getNomineeList();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const calculateAge = (birthDate) => {
    let today = new Date();
    const birthYear = birthDate.split("-");
    let age = today.getFullYear() - birthYear[0];
    if (age == 0) {
      let age_In_Month = today.getMonth() - birthYear[1];
      age = `${age_In_Month} months`;
    } else {
      age = `${age} years`;
    }
    return age;
  };
  return (
    <div className={style.nomineeCards}>
      <h2 className="title">Your nominee(s)</h2>

      {nomineeList&& nomineeList.map(
        ({ name, relationship, nominee_share, address, dob }, index) => (
          <div key={index} className={style.nomineeCard}>
            <div className={style.nomineeHeader}>
              <div className={style.headLeft}>
                <h3 className={style.nomineeTitle}>{name}</h3>
                <p>
                  <strong>{relationship},</strong> {calculateAge(dob)}
                </p>
              </div>

              <div className={style.headRight}>{nominee_share}%</div>
            </div>

            <div className={style.nomineeBody}>
              <div className={style.cardBodyLeft}>
                <p className={style.addressLabel}>Address</p>
                <p className={style.address}>{address}</p>
              </div>

              <div className={style.cardBodyRight}>
                <button className={style.editButton}>
                  <img src="/images/icon-edit.svg" alt="" />
                </button>
              </div>
            </div>

            <div className={style.nomineeFooter}>
              <button className={style.btnRemove}>Remove</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    phone: state.LandingReducer.user.phone,
    session_id: state.LandingReducer.user.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NomineeListItem);
