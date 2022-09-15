import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Header from "../../../global/Header.component";
import ButtonUI from "../../../ui/Button.component";
import { validatePAN } from "../../../validation/Validation";
import Modal from "../../../ui/Modal/Modal.component";
import styles from "./Pan.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
import { STORE_PAN } from "../../../../Redux/Landing";
import { useRouter } from "next/router";
const EnterPan = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm();
const router=useRouter()


  // Sending Data to API Using Async Await
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setisLoading(true);
      const APIData = {
        phone: parseInt(props.phone),
        pan: data.pan,
      };
      console.log(APIData);
      const getData = await AxiosInstance.post("/signup/user/pan/verify", APIData,{
        headers: {
          session_id: props.session_id,
        },
      });

      // receiving response from backend
      const res = await getData.data;
      console.log(res)
      console.log(res.name)
      if (getData.status == 200) {
        console.log(res);
        setisLoading(false);
        let UserPANDetails = {
          name: res.name,
          new_user: res.new_user,
          pan: res.pan,
          pan_status: res.pan_status,
          phone: res.phone,
        };
        let storePANDetails={
          IsPANValidated:true,
          UserPANDetails,

        }
        props.storePAN(storePANDetails);
       router.push("/co/pan/panDetails")
      } else {
        setisLoading(false);
        props.toggleModal();
      }
      reset();
    } catch (error) {
      // Error If Something Goes Wrong
      setisLoading(false);
      props.toggleModal();
      reset();
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {/* PAN Form */}
      {isLoading === true ? (
        <Loader />
      ) : (
        <section className="ContainerBG">
          <div className="bgtop">
            <img src="/images/welcomebgtop.png" />
          </div>
          <div className="bgbottom">
            <img src="/images/welcomebgbottom.png" />
          </div>

          <div className="containerMini">
            <h2 className="title">Enter your PAN</h2>
            <p className="subTitle">
              These details are required by SEBI to open your demat account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* PAN Number Input */}
              <input
                type="text"
                className="form-control"
                id="pan"
                placeholder="Enter PAN"
                maxLength={10}
                {...register("pan", {
                  required: "PAN Number is required",
                  validate: validatePAN,
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 number",
                  },
                })}
                onKeyUp={(e) => {
                  setValue("pan", e.target.value.toLocaleUpperCase());
                  trigger("pan");
                }}
              />
              {/* {errors.panNumber && (
                  <small className="form-text text-danger">
                    {errors.panNumber.message}
                  </small>
                )} */}

              {/* Submit Button */}
              <div className="checkBox duelLine">
                <input
                  type="checkbox"
                  id="enableWhatsapp"
                  defaultChecked={"checked"}
                />
                <label htmlFor="enableWhatsapp">
                  I’m a tax resident of India and not paying taxes to any other
                  jurisdiction(s).
                  <a>Know more</a>
                </label>
              </div>
              <div className={styles.note}>
                Your account would be opened as per your PAN card details.
                Please use the Offline Account Opening Form if you are looking
                to open an HUF, Corporate, Partnership, Joint or NRI account.
              </div>
              <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
                Continue
              </ButtonUI>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    session_id: state.LandingReducer.user.session_id,
    phone: state.LandingReducer.user.phone,
    showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storePAN: (storePANDetails) => dispatch(STORE_PAN(storePANDetails)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPan);

// name
// : 
// "SAIFUDDIN MOHAMMED ISRAIL ANSARI"
// new_user
// : 
// true
// pan
// : 
// "EPOPM0656F"
// pan_status
// : 
// "EXISTING AND VALID"
// phone
// : 
// 9833367549