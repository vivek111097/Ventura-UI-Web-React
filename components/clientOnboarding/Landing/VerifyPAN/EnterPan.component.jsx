import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Header from "../../../global/Header.component";
import ButtonUI from "../../../ui/Button.component";
import { validatePAN } from "../../../validation/Validation.jsx";
import Modal from "../../../ui/Modal/Modal.component";
import styles from "./Pan.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
import { STORE_PAN } from "../../../../Redux/Landing";
import { useRouter } from "next/router";
import InvalidPan from "../../../ui/Popups/PANValidation/InvalidPan";
const EnterPan = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [iserror, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Sending Data to API Using Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const errorMsg = validatePAN(data.pan);
      console.log(errorMsg);
      if (!errorMsg.validated) {
        setisLoading(false);
        setError(errorMsg.msg);
        props.toggleModal();
      } else {
        const APIData = {
          // phone: parseInt(props.phone),
          phone: 8369747962,
          pan: data.pan,
          testing: true,
        };
        console.log(APIData);
        const getData = await AxiosInstance.post(
          "/signup/user/pan/verify",
          APIData,
          {
            headers: {
              // session_id: props.session_id,
              session_id: "7f6042b8-bb43-47cd-b326-68ceb1e446c9",
            },
          }
        );

        // Pan verification attempts exceeds the limit
        // receiving response from backend
        const res = await getData.data;
        setisLoading(false);
        if (getData.status == 200) {
          console.log(res);
          if (res.message == "Pan verification attempts exceeds the limit") {
            props.toggleModal();
          }

          let UserPANDetails = {
            name: res.name,
            new_user: res.new_user,
            pan: res.pan,
            pan_status: res.pan_status,
            phone: res.phone,
          };
          let storePANDetails = {
            IsPANValidated: true,
            UserPANDetails,
          };
          props.storePAN(storePANDetails);
          router.push("/co/pan/panDetails");
        } else {
          setisLoading(false);
          props.toggleModal();
        }
        reset();
      }
    } catch (error) {
      // Error If Something Goes Wrong
      setisLoading(false);
      reset();
      console.log(error);
    }
  };

  console.log(errors);
  // console.log(isDirty)
  // console.log(isValid)
  useEffect(() => {
    var lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, []);
  return (
    <>
      <Header />
      {/* PAN Form */}
      {props.showModal && (
        <Modal ModalType="signature_modal" onClick={props.toggleModal}>
          <InvalidPan errorMsg={iserror} showModal={props.toggleModal} />
        </Modal>
      )}
      {isLoading === true ? (
        <Loader />
      ) : (
        <section className="ContainerBG">
          <div className="bgtop">
            <img src="/images/welcomebgtop.png" alt="lines" />
          </div>
          <div className="bgbottom">
            <img src="/images/welcomebgbottom.png" alt="lines" />
          </div>

          <div className="containerMini">
            <h2 className="animate__animated title">Enter your PAN</h2>
            <p className="animate__animated subTitle">
              These details are required by SEBI to open your demat account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* PAN Number Input */}
              <input
                type="text"
                className="animate__animated form-control"
                id="pan"
                placeholder="Enter PAN"
                maxLength={10}
                {...register("pan", {
                  // pattern: {
                  //   value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                  //   message: "Invalid PAN Number",
                  // },
                  required: "PAN Number is required",
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 number",
                  },
                })}
                onKeyUp={(e) => {
                  {
                    e.target.value.length == 10
                      ? setisDisabled(false)
                      : setisDisabled(true);
                  }
                  setValue("pan", e.target.value.toLocaleUpperCase());
                }}
              />

              <div className="animate__animated checkBox duelLine">
                <input
                  type="checkbox"
                  id="enableWhatsapp"
                  defaultChecked={"checked"}
                />
                <label htmlFor="enableWhatsapp">
                  I’m a tax resident of India and not paying taxes to any other
                  jurisdiction(s).
                  <a href="#">Know more</a>
                </label>
              </div>
              <div className={`animate__animated ${styles.note}`}>
                Your account would be opened as per your PAN card details.
                Please use the Offline Account Opening Form if you are looking
                to open an HUF, Corporate, Partnership, Joint or NRI account.
              </div>
              <div className="animate__animated">
                <ButtonUI type={"submit"} disabled={isDisabled}>
                  Continue
                </ButtonUI>
              </div>
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
