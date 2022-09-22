import React from "react";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import AxiosInstance from "../../../../Api/Axios/axios";
import ButtonUI from "../../../ui/Button.component";

import style from "./kra.module.css";

const KraComponent = (props) => {
    const [KraData,setKraData]=useState({});
    useEffect(()=>{
        const getKraData= async()=>{
        const {data} = await AxiosInstance.post("/signup/kra/data/get", {
            "phone": 8369747962,
            "pan": "BFMPC9409P",
            "dob": "11/10/1997"
        }, {
            headers: {
              session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
            },
          });
          setKraData(data)
          console.log(data)
        }
        getKraData();
        
    },[])
  return (
    <section className={style.formContainer}>
        <p className={style.kraHead}>Verify via KRA</p>
        <p className={style.kraSubtitle}>Confirm your details.</p>
      <div className={style.card}>
        <ul className={style.container__list}>
          <li className={style.list_item}>
              <div className={style.key}>Name</div>
              <div className={style.value}>{KraData.name}</div>
          </li>
          <li className={style.list_item}>
            <div className={style.key}>Father&lsquo;s Name</div>
            <div className={style.outer_div}>
                <div className={style.value}>{KraData.fathers_name}</div>
                <button className={style.btn}>Edit {`>`}</button>
                </div>
            
          </li>
          <li className={style.list_item}>
            <div className={style.key}>DOB</div>
            <div className={style.value}>{KraData.dob}</div>
          </li>
          <li className={style.list_item}>
            <div className={style.key}>Gender</div>
            <div className={style.value}>{KraData.gender}</div>
          </li>
          <li className={style.list_item}>
            <div className={style.key}>Address</div>
            <div className={style.value}>
             {KraData.permanent_address}
            </div>
          </li>
        </ul>
      </div>
      <p className={style.uploadTitle}>Upload PAN and Aadhar Card</p>
      <p className={`${style.kraSubtitle} ${style.uploadSubtitle}`}>You can upload your PAN and Aadhaar card photos now or at the end of the account opening process.</p>
      <div>
        <ul className={style.note}>
            <li>Click the photos directly through our app or upload them from files.</li>
        </ul>
      </div>
      <ButtonUI>Upload Photos</ButtonUI>
      <div className={style.skip}><button className={style.btn}>Skip for Now</button></div>
      
    </section>
  );
};


const mapStateToProps = (state) => {
    return {
      session_id: state.LandingReducer.user.session_id,
      phone: state.LandingReducer.user.phone,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleModal: () => dispatch(TOGGLE_MODAL()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(KraComponent);
