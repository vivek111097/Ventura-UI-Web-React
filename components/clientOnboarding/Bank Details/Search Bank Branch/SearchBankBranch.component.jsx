import React, { useState } from "react";
import AxiosInstance from "../../../../Api/Axios/axios";
import styles from "./SearchBankBranch.module.css";

const SearchBankBranch = () => {
  const [BranchData, setBranchData] = useState([]);
  const getBankData = async (key) => {
    if (key != "") {
      const { data, status } = await AxiosInstance.get(
        `https://kyc-qa.ventura1.com/onboarding/v2/signup/user/bank/branches?bank=State Bank of India&search=SBIN000931`,
        {
          headers: {
            session_id: "bc693998-bf62-4193-b859-be7003cda053",
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
          let arr = [{ name: "Branch data not found" }];
          setBranchData(arr);
        }
      } else {
        let arr = [{ name: "Branch data not found" }];
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
          placeholder="Search your bank"
          type="text"
          onKeyUp={(e) => getBankData(e.target.value)}
        />
        <img className={styles.search_icon} src="/images/search.svg" alt="" />
      </div>

      <p className={styles.search_result}>search Result</p>
      <div className={styles.branchlist}>
        <ul>
          {BranchData.map((branch, i) => (
          <li className={styles.branchlistItem} key={i}>
          <div className={styles.listitem_wraper}>
            <p className={styles.branch_titel}>{branch.ifsc}-{branch.location}</p>
            <p className={styles.branch_subtitel}>
                {branch.address },{branch.branch_code}
            </p>
          </div>
        </li>
        ))}

        </ul>
      </div>
    </div>
  );
};

export default SearchBankBranch;
