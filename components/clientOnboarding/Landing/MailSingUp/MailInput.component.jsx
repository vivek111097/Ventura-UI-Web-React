import React, { useState } from "react";
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

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <h2 className="title">Add your email</h2>
          <p className="subTitle">
            This is where we&lsquo;ll send you important updates and insights on the
            market.
          </p>
          {/* Email Form  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
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
            <ButtonUI type={"submit"} disabled={!isDirty || !isValid}>
              Verify Email
            </ButtonUI>
            <div className={styles.or}>OR</div>
          </form>
          <ButtonUI type={"submit"}>Continue with Google</ButtonUI>
        </>
      )}
      {showModal === true ? (
        <Modal onClick={toggleModal}>
          <ButtonUI onClick={toggleModal}>x</ButtonUI>
          <h1>Something went Wrong</h1>
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
