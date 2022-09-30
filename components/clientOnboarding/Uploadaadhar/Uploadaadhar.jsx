import React, { useState,useEffect } from "react";
import { Router, useRouter } from "next/router";
import Header from '../../global/Header.component';
import ButtonUI from "../../ui/Button.component";
import Modal from "../../ui/Modal/Modal.component";
import {connect} from "react-redux";
import styles from './Uploadaadhar.module.css';
import UploadaadharPop from "../../ui/Popups/Uploadaadhar/UploadaadharPop.component";
import {TOGGLE_MODAL} from "../../../Redux/modal";
import AxiosInstance from "../../../Api/Axios/axios";
import Loader from "../../ui/Loader/Loader.component";
import Apiresponse from "../../ui/Popups/Apiresponse/Apiresponse";
import Accessdenied from "../../ui/Popups/Accessdenied/Accessdenied";

const Uploadaadhar = (props) =>{
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const { showModal, toggleModal } = props;
    const [frontimg, Setfrontimg] = useState(null);
    const [backimg, Setbackimg] = useState(null);
    const [Aadharpic,SetAadharpic] = useState('');
    const [disablebtn,Setdisablebtn] = useState(true);
    const [Fdoctype,SetFdoctype] = useState('');
    const [Bdoctype,SetBdoctype] = useState('');
    const [disableuploadbtn,Setdisableuploadbtn] = useState(true);

    const [SuccessApiRes,SetSuccessApiRes] = useState("");
    const [access,Setaccess] = useState(false)
    const [apires,Setapires] = useState(false);
    const [Upload,SetUpload] = useState(false);
    const [camaccess,Setcamaccess] = useState('');

     
    useEffect(() => {
        var lineItem = document.querySelectorAll(".animate__animated");
        lineItem.forEach((item, index) => {
          item.className += " animate__fadeInUp animate__delay_" + index;
        });
    }, []);

    const pull_data = (data) => {
        if(data == 'camstatus'){
            Setaccess(true);
            SetUpload(false)
        }
        else{
            const base64Data = data;
            const [,type] = base64Data.split(';')[0].split('/');
    
            if(Aadharpic == 'front'){
                Setfrontimg(base64Data);
                Setdisablebtn(false);
                SetFdoctype(type);
                Setdisableuploadbtn(false)
            }
            if(Aadharpic == 'back'){
                Setbackimg(base64Data);
                SetBdoctype(type);
            }
            props.toggleModal();
        }
    }

    const pull_accessdata = (data) =>{
        if(data == 'Permission'){
            Setaccess(false);
            SetUpload(true);
            Setcamaccess('Permission');
        }
        else if(data == 'UploadPhoto'){
            Setaccess(false);
            SetUpload(true);
        }
    }
    const UploadPhoto = () =>{
        if(backimg != null){
            frontAadhar();
            backAadhar();
        }
        else{
            frontAadhar();
        }
    }
    const frontAadhar = async (data) => {
        setisLoading(true)
        let PhoneNum = 7020577995;
         
        try {
            const APIData =   {
                "phone": PhoneNum,
                "side": "front",
                "file": frontimg
            };
            console.log(APIData);
            const getData = await AxiosInstance.post("signup/user/aadhar/upload",
                APIData,
                {
                    headers: {
                        // session_id: props.session_id,
                        session_id: "1e1f88c2-e254-40b4-adf4-b2eff154b638",
                    },
                }
            );
            const res = await getData.data;
             
            if (getData.status == 200) {
                setisLoading(false);
                SetSuccessApiRes(res.message);
                SetUpload(false);
                Setapires(true);
                toggleModal();
                localStorage.setItem("aadharimg", frontimg)
                setTimeout(() => {
                    router.push("/co/uploadpan");
                }, 3000);
                
                
                
                router.push("personalInfo/maritalStatus")
            }

        } catch (error) {
            setisLoading(false);
            if(error.message){
                SetSuccessApiRes(error.message);
            }
            else if(error.response.data.message){
                SetSuccessApiRes(error.response.data.message);
            }
            toggleModal();
            SetUpload(false);
            Setapires(true)
        }[]
    }
    const backAadhar = async (data) => {
        let PhoneNum = 7020577995;
         
        try {
            const APIData =   {
                "phone": PhoneNum,
                "side": "back",
                "file": backimg
            };
            console.log(APIData);
            const getData = await AxiosInstance.post("signup/user/aadhar/upload",
                APIData,
                {
                    headers: {
                        // session_id: props.session_id,
                        session_id: "1e1f88c2-e254-40b4-adf4-b2eff154b638",
                    },
                }
            );
            const res = await getData.data;
             
            if (getData.status == 200) {
                setisLoading(false);
                SetSuccessApiRes(res.message);
                SetUpload(false);
                Setapires(true);
                toggleModal();
                router.push("personalInfo/maritalStatus")
                
                    // router.push("/co/uploadpan");
               
            }

        } catch (error) {
            setisLoading(false);
            if(error.message){
                SetSuccessApiRes(error.message);
            }
            else if(error.response.data.message){
                SetSuccessApiRes(error.response.data.message);
            }
            toggleModal();
            SetUpload(false);
            Setapires(true)
        }[]
    }

    return(
        <>
        {isLoading === true && (
            <Loader />
        )}      
        <Header />
        <section className="ContainerBG">
            <div className="bgtop">
                <img src="/images/welcomebgtop.png" alt="lines"/>
            </div>
            <div className="bgbottom">
                <img src="/images/welcomebgbottom.png" alt="lines"/>
            </div>

            <div className="containerMini">
                
                <h2 className="title animate__animated">Upload Aadhaar card</h2>
                <p className="subTitle animate__animated">Click photos of your Aadhaar card or upload from files.</p>
                <div className={`animate__animated ${styles.RememberList}`}>
                    <h3 className={styles.ListTitle}>Please remember:</h3>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-Signature-box'></span>
                        </div>
                        <p className={styles.steptext}>Upload both the front and back of your Aadhaar card.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-Image'></span>
                        </div>
                        <p className={styles.steptext}>Photos must be clear; maximum size limit is 2 MB each.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-clear-picture'></span>
                        </div>
                        <p className={styles.steptext}>Photos must be well-lit and glare-free.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-Image'></span>
                        </div>
                        <p className={styles.steptext}>If you have an Aadhaar letter, upload a single photo of your address and details.</p>
                    </div>
                </div>
                <div className={`animate__animated ${styles.UploadBoxwrap}`}>
                    <button className={styles.UploadBox} onClick={() => {toggleModal();SetAadharpic('front');SetUpload(true);Setapires(false);Setcamaccess('');Setaccess(false);}}>
                        {frontimg == null && (
                            <>
                                <span className={`icon-Plus ${styles.icon}`}></span>
                                <p className={styles.UploadBoxtxt}>Upload Front</p>
                            </>
                            )}
                        {frontimg && (
                            <>
                                {Fdoctype == 'pdf' && (
                                    <iframe className={styles.Aadharimg} src={frontimg} alt="" ></iframe>
                                )}
                                {Fdoctype != 'pdf' && (
                                    <img className={styles.Aadharimg} src={frontimg} alt="" />
                                )}
                                <a className={`icon-Edit ${styles.Editaadhar}`}></a>
                            </>
                        )}
                    </button>
                    <button className={styles.UploadBox} disabled={disablebtn} onClick={() => {toggleModal();SetAadharpic('back');Setapires(false);Setcamaccess('');Setaccess(false);}}>
                        {backimg == null && (
                            <>
                                <span className={`icon-Plus ${styles.icon}`}></span>
                                <p className={styles.UploadBoxtxt}>Upload Back</p>
                            </>
                            )}
                        {backimg && (
                            <>
                                {Bdoctype == 'pdf' && (
                                    <iframe className={styles.Aadharimg} src={backimg} alt="" ></iframe>
                                )}
                                {Bdoctype != 'pdf' && (
                                    <img className={styles.Aadharimg} src={backimg} alt="" />
                                )}
                                <a className={`icon-Edit ${styles.Editaadhar}`}></a>
                            </>
                        )}
                    </button>
                    
                </div>
                <div className="animate__animated btn-sticky">
                    <ButtonUI disabled={disableuploadbtn} type={"submit"} onClick={UploadPhoto} > Upload photos</ButtonUI>
                </div>
                
                {/* {showModal && <Modal ModalType="signature_modal" onClick={toggleModal}>
                    <UploadaadharPop func={pull_data} cardside={Aadharpic} />
                </Modal>} */}
                {showModal && (
                    <>
                        {Upload == true && (
                            <Modal ModalType="signature_modal" onClick={toggleModal}>
                                <UploadaadharPop func={pull_data} cardside={Aadharpic} camaccess={camaccess} />
                            </Modal>
                        )}
                        {apires == true && (
                            <Modal ModalType="panValidation" onClick={toggleModal}>
                                <Apiresponse apires={SuccessApiRes} />
                            </Modal>
                        )}
                        {access == true && (
                            <Modal ModalType="panValidation" onClick={toggleModal}>
                                <Accessdenied func={pull_accessdata} />
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </section>
                
             
        </>
    )
}


                // setTimeout(() => {
                    
                //     router.push("/co/uploadpan");
                // }, 3000);
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

export default connect(mapStateToProps, mapDispatchToProps)(Uploadaadhar);
