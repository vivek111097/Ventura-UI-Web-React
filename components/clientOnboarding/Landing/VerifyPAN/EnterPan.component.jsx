import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { STORE_PAN } from "../../../../Redux/Landing";
import { TOGGLE_MODAL } from "../../../../Redux/modal";

import Header from "../../../global/Header.component";
import ButtonUI from "../../../ui/Button.component";
import { validatePAN } from "../../../validation/Validation.jsx";
import Modal from "../../../ui/Modal/Modal.component";
import styles from "./Pan.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import InvalidPan from "../../../ui/Popups/PANValidation/InvalidPan";
const EnterPan = (props) => {
  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Button Disabled State
  const [isDisabled, setisDisabled] = useState(true);

  // Error Msg State
  const [isError, setError] = useState("");

  const [responceType, setResponceType] = useState(null);
  const [icon, setIcon] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [content, setcontent] = useState("");
  const [checkbox, setcheckbox] = useState(true);

  // PAN Validation Status
  const [isPanValid, setisPanValid] = useState(false);

  // PAN Error Msg
  const [showPanErrorMsg, setshowPanErrorMsg] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
  } = useForm();
  const router = useRouter();

  console.log(isDisabled,"disabled state")
  // Sending Data to API Using Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);

      // Validating PAN Using Different Regex
      const errorMsg = validatePAN(data.pan);
 
      if (!errorMsg.validated) {
        setisLoading(false);
        setError(errorMsg.msg);
        setIcon(errorMsg.icon);
        setcontent(errorMsg.content);
        setButtonText(errorMsg.buttonText);
        setResponceType(errorMsg.responceType);
        props.toggleModal();
      } else {
        // Sending data to API
        const APIData = {
          phone: parseInt(props.phone),
          pan: data.pan,
          testing: true,
        };

        const getData = await AxiosInstance.post(
          "/signup/user/pan/verify",
          {
            ...APIData,
          },
          {
            headers: {
              session_id: props.session_id,
            },
          }
        );

        // Pan verification attempts exceeds the limit
        // receiving response from backend
        const res = await getData.data;
        setisLoading(false);
        if (getData.status == 200) {
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
      setisDisabled(true);
      // props.toggleModal();
      reset();
    }
  };
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
        <Modal ModalType="panValidation" onClick={props.toggleModal}>
          <InvalidPan
            buttonText={buttonText}
            errorMsg={isError}
            content={content}
            icon={icon}
            responceType={responceType}
            showModal={props.toggleModal}
          />
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
              {/* Tooltip for Invalid Pan */}
              <div className="inputTooltip animate__animated">
                <div className={`tooltip ${!showPanErrorMsg && "hide"} `}>
                  <div className="icon-Access-denied "></div>

                  <span className="tooltiptext tooltip-top">
                    PAN details invalid!
                  </span>

                  {/* <span className="tooltiptext tooltip-top">
                    PAN details invalid! {errors.pan.message}
                  </span> */}
                </div>

                {/* PAN Number Input */}
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  placeholder="Enter PAN"
                  maxLength={10}
                  {...register("pan", {
                    pattern: {
                      value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/,
                      message: "Invalid PAN Number",
                    },
                    // required: "PAN Number is required",
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 number",
                    },
                  })}
                  onChange={(e) => {
                    e.preventDefault();
                    setValue(
                      "pan",
                      e.target.value
                        .replace(/[^a-z0-9]/gi, "")
                        .toLocaleUpperCase()
                    );
                    if (e.target.value.length == 10) {
                      if (
                        /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(
                          e.target.value
                        )
                      ) {
                        setshowPanErrorMsg(false);
                        setisPanValid(true);
                        if (checkbox) {
                          setisDisabled(false);
                        } else {
                          setisDisabled(true);
                        }
                      } else {
                        setshowPanErrorMsg(true);
                        setisDisabled(true);
                        setisPanValid(false);
                      }
                    } else {
                      setshowPanErrorMsg(false);
                      setisDisabled(true);
                      setisPanValid(false);
                    }
                  }}
                />
              </div>

              <div className="animate__animated checkBox duelLine">
                <input
                  type="checkbox"
                  id="enableWhatsapp"
                  defaultChecked={"checked"}
                  onInput={(e) => {
                    e.preventDefault();
                    if (e.target.checked) {
                      setcheckbox(true);
                      if (isPanValid) {
                        setisDisabled(false);
                      } 
                      else {
                        setisDisabled(true);
                      }
                    } else {
                      setcheckbox(false);
                      setisDisabled(true);
                      if (isPanValid) {
                        setisDisabled(true);
                      }
                    }
                    // e.target.checked ? setcheckbox(true) : setcheckbox(false);
                  }}
                  {...register("checkbox", {
                    required: true,
                  })}
                />
                <label htmlFor="enableWhatsapp">
                  I’m a tax resident of India and not paying taxes to any other
                  jurisdiction(s).
                  {/* <Link href="#">
                    <a onClick={displayFatcaDeclaration}>Know more</a>
                  </Link> */}
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
