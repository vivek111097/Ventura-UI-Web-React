import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { STORE_EMAIL } from "../../../../Redux/Landing";
import ButtonUI from "../../../ui/Button.component";
import styles from ".././Landing.module.css";
import AxiosInstance from "../../../../Api/Axios/axios";
import Loader from "../../../ui/Loader/Loader.component";
import Modal from "../../../ui/Modal/Modal.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";


const MailInput = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);
  const { otpSent, setotpSent } = props;
  const { showModal, toggleModal } = props;
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm();

  // Defining Regex for Email
  const MailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //   Email Validation
  const validateEmail = (email) => {
    if (MailRegex.test(email)) {
      return true;
    } else {
      return "Invalid Email ID";
    }
  };

  // Handling Form  on Submit USing Async Await
  const onSubmit = async (data) => {
    try {
      setisLoading(true);
      console.log(data.email);

      // Sending data to API
      const APIData = {
        email: data.email,
      };
      console.log(APIData);
      const getData = await AxiosInstance.post("/signup/user/email", APIData, {
        headers: {
          session_id: props.session_id,
        },
      });

      //   receiving response from backend
      const res = await getData.data;
      if (getData.status == 200) {
        console.log(res);
        setisLoading(false);
        setotpSent(true);
        let MailData = {
          email: data.email,
          IsEmailOTPSent: true,
        };
        props.setEmail(MailData);
      } else {
        props.toggleModal();
        setisLoading(false);
      }
      reset();
    } catch (error) {
      // Error IF Something Goes Wrong
      props.toggleModal();
      console.log(error);
      setisLoading(false);
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
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <h2 className="title animate__animated">Add your email</h2>
          <p className="subTitle animate__animated">
            This is where we&lsquo;ll send you important updates and insights on the
            market.
          </p>
          {/* Email Form  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row animate__animated">
              <div className="col">
                {/* Defining Email Input */}
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  {...register("email", {
                    required: "Email is required",
                    validate: validateEmail,
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
              </div>
            </div>

            {/* Submit BUtton */}
            <div className="animate__animated">
              <ButtonUI btnType="btn btn-outline" type={"submit"} disabled={!isDirty || !isValid}>
                Verify Email
              </ButtonUI>
            </div>
            <div className={`animate__animated ${styles.or}`}>OR</div>
          </form>
          <div className="animate__animated">
            <ButtonUI btnType={styles.gmail} type={"submit"}> <img src="/images/googleMail.svg" alt="gmail Icon" /> Continue with Google</ButtonUI>
          </div>
          
        </>
      )}
      {showModal === true ? (
        <Modal onClick={toggleModal}>
        <div className="center">

        <h3 className="title">Some thing went Wrong</h3>
        </div>
        </Modal>
      ) : null}
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
    setEmail: (email) => dispatch(STORE_EMAIL(email)),
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailInput);
