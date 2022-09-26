import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";
import styles from "./AddBank.module.css";
import { connect } from 'react-redux';
import { SET_SELECTED_BANK } from "../../../../Redux/Landing";
import { useRouter } from 'next/router'

const AddBank = (props) => {
   const router = useRouter()
  const [bankData, setBankData] = useState([]);
  const getBankData = async (key) => {
    if (key != "") {
      const { data, status } = await AxiosInstance.get(
        `signup/user/bank/banks?search=${key}`,
        {
          headers: {
            // session_id: props.session_id,
             session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064",
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

  const AfterBankSelect = (bankName) => {
    props.storeBankName(bankName);
    router.push("/co/bank/select-branch")

  }

  return (
    <div className={styles.formContainer}>
      <p className={styles.add_bank_account}>Add Bank Account</p>
      <p className={styles.note}>Make your transactions more convenient.</p>
      <div className={styles.success_info}>
        <div>
          <img src="/images/strongbox.svg" alt="" />
        </div>
        <div>
          Your bank details are secured and will not be shared with anyone
        </div>
      </div>
      <div className={styles.search_content}>
        <input
          className="form-control"
          placeholder="Search your bank"
          type="text"
          onKeyUp={(e) => getBankData(e.target.value)}
        />
        <img className={styles.search_icon} src="/images/search.svg" alt="" />
      </div>
      {!bankData.length == 0 && (
        <p className={styles.search_result}>search Result</p>
      )}
      <div className={styles.banklist}>
        <ul>
          {bankData.map((bank, i) => (
            <li
              onClick={()=>AfterBankSelect(bank.name)}
              className={styles.banklistItem}
              key={i}
            >
              {bank.name}
            </li>
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

