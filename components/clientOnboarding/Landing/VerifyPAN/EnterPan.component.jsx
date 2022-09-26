import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../../global/Header.component";
import ButtonUI from "../../../ui/Button.component";
import { validatePAN } from "../../../validation/Validation.jsx";
import Modal from "../../../ui/Modal/Modal.component";
import styles from "./Pan.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
import { STORE_PAN } from "../../../../Redux/Landing";
import InvalidPan from "../../../ui/Popups/PANValidation/InvalidPan";
import FatcaValidation from "../../../ui/Popups/PANValidation/FatcaValidation";
const EnterPan = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [isError, setError] = useState("");
  const [responceType, setResponceType] = useState(null);
  const [icon, setIcon] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [content, setcontent] = useState("");
  const [checkbox, setcheckbox] = useState(true);
  const [isPanValid, setisPanValid] = useState(true);
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

  // Sending Data to API Using Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      const errorMsg = validatePAN(data.pan);
      console.log(errorMsg);
      if (!errorMsg.validated) {
        setisLoading(false);
        setError(errorMsg.msg);
        setIcon(errorMsg.icon);
        setcontent(errorMsg.content);
        setButtonText(errorMsg.buttonText);
        setResponceType(errorMsg.responceType);
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
              session_id: "5ebcdfdf-0496-4d50-a819-33f83de5f857",
            },
          }
        );

        // Pan verification attempts exceeds the limit
        // receiving response from backend
        const res = await getData.data;
        console.log(getData);
        setisLoading(false);
        if (getData.status == 200) {
          console.log(res);
          // if (res.message == "Pan verification attempts exceeds the limit") {
          //   props.toggleModal();
          // }

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

      props.toggleModal();
  //  { props.showModal?(
  //     <Modal onClick={toggleModal}>
  //     <InvalidPan
  //           buttonText={buttonText}
  //           errorMsg={isError}
  //           content={SomeThing}
  //           responceType={responceType}
  //           showModal={props.toggleModal}
  //         />
  //     </Modal>
  //   ):null}
      reset();
      console.log(error);
    }
  };
  // const displayFatcaDeclaration = () => {
  //   props.toggleModal();
  //   props.showModal ? (
  //     <Modal onClick={toggleModal}>
  //       <FatcaValidation />
  //     </Modal>
  //   ) : null;
  // };
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
              
                  <div className={`tooltip ${!showPanErrorMsg && "hide"} `} >
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
                  onChange={(e)=>{
                    e.preventDefault()
                    setValue("pan",e.target.value.replace(/[^a-z0-9]/gi, "").toLocaleUpperCase())
                  if(e.target.value.length==10){
                    if( /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(e.target.value)){
                      setshowPanErrorMsg(false);
                      setisPanValid(true)
                      if(!checkbox){
                        setisDisabled(true)
                      }
                      else{
                        setisDisabled(false)
                      }
                    }else{
                      setshowPanErrorMsg(true)
                      setisPanValid(false)
                    }
                  }else{
                    setshowPanErrorMsg(false)
                    setisDisabled(true)
                  }
                  }}
                />
              </div>

              <div className="animate__animated checkBox duelLine">
                <input
                  type="checkbox"
                  id="enableWhatsapp"
                  defaultChecked={"checked"}
                  // onChange={(e)=>{
                  //   console.log(e.target.checked)
                  // }}
                  onInput={(e) => {
                    e.preventDefault()
                    console.log(e.target.checked)
                    if(e.target.checked){
                      setcheckbox(true)
                      if(isPanValid){
                        setisDisabled(false)
                      }else{
                        setisDisabled(true)
                      }
                    }else{
                      setcheckbox(false)
                      if(isPanValid){
                        setisDisabled(false)
                      }else{
                        setisDisabled(true)
                      }

                    }
                    // e.target.checked ? setcheckbox(true) : setcheckbox(false);
                  }}
                  {...register("checkbox",{
                    required:true
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
