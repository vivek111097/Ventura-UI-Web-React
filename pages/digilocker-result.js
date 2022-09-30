import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import AxiosInstance from "../Api/Axios/axios";
import ButtonUI from "../components/ui/Button.component";
import ConfirmDetails from "../components/clientOnboarding/EkycProcess/ConfirmDetails.component";

const DigilockerResult = (props) => {
  const router = useRouter();
  console.log(router.query);

  const getAadharCardData = async () => {
    const { data } = await AxiosInstance.post(
      "/digilocker/data",
      {
        phone: props.phone,
        aadhar: router.query.code,
      },
      {
        headers: {
          session_id: props.session_id,
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    if (router.query.error === "consent_required") {
      router.push("/kra");
    } else {
      getAadharCardData();
    }
  });
  return (
    <>
<ConfirmDetails/>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DigilockerResult);
