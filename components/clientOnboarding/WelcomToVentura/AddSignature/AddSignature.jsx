import Link from "next/link";
import React, { useState,useEffect } from "react";
import Header from '../../../global/Header.component';
import ButtonUI from "../../../ui/Button.component";
import Modal from "../../../ui/Modal/Modal.component";
import { connect } from "react-redux";
import styles from './Signature.module.css';
import AddSignaturePopup from "../../../ui/Popups/AddSignaturePop/AddSignaturePop.component";
import { TOGGLE_MODAL } from "../../../../Redux/modal";
const AddSignature = (props) =>{
    const { showModal, toggleModal } = props;
    useEffect(() => {
        var lineItem = document.querySelectorAll(".animate__animated");
        lineItem.forEach((item, index) => {
          item.className += " animate__fadeInUp animate__delay_" + index;
        });
      }, []);
    return(
        <>
        <Header />
        <section className="ContainerBG">
            <div className="bgtop">
                <img src="/images/welcomebgtop.png" alt="lines"/>
            </div>
            <div className="bgbottom">
                <img src="/images/welcomebgbottom.png" alt="lines"/>
            </div>

            <div className="containerMini">
                <h2 className="title animate__animated">Add your signature</h2>
                <p className="subTitle animate__animated">Use the signature-box to sign using your mouse/finger/stylus.</p>
                <div className={`animate__animated ${styles.RememberList}`}>
                    <h3 className={styles.ListTitle}>Please remember:</h3>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>Signature-box opens in landscape mode.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>Signature must match with the one on your Aadhaar/PAN card.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>For uploading photo, the size limit is 2 MB.</p>
                    </div>
                </div>
                <div className="animate__animated">
                    <ButtonUI type={"submit"} onClick={toggleModal}> Continue </ButtonUI>
                </div>
                {showModal && <Modal ModalType="signature_modal" onClick={toggleModal}>
                    <AddSignaturePopup />
                </Modal>}
            </div>
        </section>
        
        </>
    )
}
const mapStateToProps = (state) => {
    return {
      showModal: state.modalReducer.showModal,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleModal: () => dispatch(TOGGLE_MODAL()),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddSignature);
