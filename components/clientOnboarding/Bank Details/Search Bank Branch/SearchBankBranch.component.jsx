import React, { useState } from "react";
import { connect } from "react-redux";
import AxiosInstance from "../../../../Api/Axios/axios";
import styles from "./SearchBankBranch.module.css";

const SearchBankBranch = (props) => {
  const [BranchData, setBranchData] = useState([]);
  const getBankData = async (key) => {
    if (key != "") {
      const { data, status } = await AxiosInstance.get(
        `/signup/user/bank/branches?bank=${props.selected_bank}&search=${key}`,
        {
          headers: {
            session_id: "2395a076-e0df-4827-adfd-912b8b46e40a",
            // session_id: props.session_id,
          },
        }
      );
      if (status === 200) {
        if (!data.message) {
          if (data.branches !== undefined) {
            setBranchData(data.branches);
          }
        } else {
          console.log("Branch data not found");
          let arr = [{ message: "Branch data not found" }];
          setBranchData(arr);
        }
      } else {
        let arr = [{ message: "Branch data not found" }];
        setBranchData(arr);
      }
    } else {
      setBranchData([]);
    }
  };
  return (
    <div className={styles.formContainer}>
      <p className={styles.search_branch_name}>Search branch name</p>

      <div className={styles.search_content}>
        <input
          className="form-control"
          placeholder="Search your branch name"
          type="text"
          onKeyUp={(e) => getBankData(e.target.value)}
        />
        <img className={styles.search_icon} src="/images/search.svg" alt="" />
      </div>

      {!BranchData.length == 0 && (
        <p className={styles.search_result}>search Result</p>
      )}
      <div className={styles.branchlist}>
        <ul>
          {BranchData.map((branch, i) =>
            branch.message ? (
              <>{branch.message}</>
            ) : (
              <li className={styles.branchlistItem} key={i}>
                <div className={styles.listitem_wraper}>
                  <p className={styles.branch_title}>
                    {branch.ifsc}-{branch.location}
                  </p>
                  <p className={styles.branch_subtitle}>
                    {branch.address},{branch.branch_code}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    phone: state.LandingReducer.user.phone,
    session_id: state.LandingReducer.user.session_id,
    selected_bank: state.LandingReducer.user.bank_details.selected_bank,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeBranchName: (branchName) => dispatch(SET_SELECTED_BANK(bankName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBankBranch);

