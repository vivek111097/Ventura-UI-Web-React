import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AxiosInstance from "../../../Api/Axios/axios";
import styles from "./AddBank.module.css";
import { connect } from "react-redux";

const AddBank = () => {
  const [bankData, setBankData] = useState([]);
  const getBankData = async (key) => {
    if (key != "") {
      const { data, status } = await AxiosInstance.get(
        `signup/user/bank/banks?search=${key}`,
        {
          headers: {
            // session_id: "bc693998-bf62-4193-b859-be7003cda053",
            session_id:props.session_id
          },
        }
      );
      if (status === 200) {
        if (!data.message) {
          if (data.banks !== undefined) {
            setBankData(data.banks);
          }
        } else {
          console.log("Bank Details not Found");
          let arr = [{ name: "Bank Details not Found" }];
          setBankData(arr);
        }
      } else {
        let arr = [{ name: "Bank Details not Found" }];
        setBankData(arr);
      }
    }
    else{
      setBankData([]);
    }
  };
  useEffect(() => {
    var lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, []);
  return (
    <section className="ContainerBG">
        <div className="bgtop">
            <img src="/images/welcomebgtop.png" alt='lines'/>
        </div>
        <div className="bgbottom">
            <img src="/images/welcomebgbottom.png" alt='lines'/>
        </div>

        <div className="containerMD">
          <h2 className="animate__animated title">Add Bank Account</h2>
          <p className="animate__animated subTitle">Make your transactions more convenient.</p>
          <div className={`animate__animated ${styles.success_info}`}>
            <div>
              <img src="/images/strongbox.svg" alt="" />
            </div>
            <div>
              Your bank details are secured and will not be shared with anyone
            </div>
          </div>
          <div className={`animate__animated ${styles.search_content}`}>
            <input
              className="form-control"
              placeholder="Search your bank"
              type="text"
              onKeyUp={(e) => getBankData(e.target.value)}
            />
            <img className={styles.search_icon} src="/images/search.svg" alt="" />
          </div>
          <p className={`animate__animated ${styles.search_result}`}>search Result</p>
          <div className={`animate__animated ${styles.banklist}`} >
          <ul >
            {bankData.map((bank, i) => (
              <li className={styles.banklistItem} key={i}>{bank.name}</li>
            ))}
          </ul>
          </div>
          {/* 
          <div className={styles.banks}>
            <div className={styles.popular_bank}>
              <ul>
                <li>
                <img src="/images/icici.svg" alt="" />
                <p>ICICI</p>
                </li>

                <li>
                <img src="/images/icici.svg" alt="" />
                <p>ICICI</p>
                </li>


                <li>
                <img src="/images/icici.svg" alt="" />
                <p>ICICI</p>
                </li>

                <li>
                <img src="/images/icici.svg" alt="" />
                <p>ICICI</p>
                </li>
              </ul>
            </div>

            <div className={styles.all_bank}>
              <ul>
                <li><img src="/images/icici.svg" alt="" />
                <p>ICICI</p></li>
                <li><img src="/images/icici.svg" alt="" />
                <p>ICICI</p></li>
                <li><img src="/images/icici.svg" alt="" />
                <p>ICICI</p></li>
                
              </ul>
            </div>
          </div> */}
        </div>
        
    </section>
    
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
    storeBankName: (bankName) => dispatch(SET_SELECTED_BANK(bankName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBank);
