import React, { useState,useEffect } from "react";
import Header from '../../global/Header.component';
import ButtonUI from "../../ui/Button.component";
import Modal from "../../ui/Modal/Modal.component";
import { connect } from "react-redux";
import styles from './Uploadpan.module.css';
import UploadpanPop from "../../ui/Popups/UploadPan/UploadpanPop.component";
import { TOGGLE_MODAL } from "../../../Redux/modal";
import AxiosInstance from "../../../Api/Axios/axios";
import Loader from "../../ui/Loader/Loader.component";
import Apiresponse from "../../ui/Popups/Apiresponse/Apiresponse";
import Accessdenied from "../../ui/Popups/Accessdenied/Accessdenied";
const Uploadpan = (props) =>{
    const [isLoading, setisLoading] = useState(false);
    const {showModal, toggleModal } = props;
    const [uploadscreen,Setuploadscreen] = useState(true);
    const [uplodedscreen,Setuplodedscreen] = useState(false)
    const [pancardimg, Setpancardimg] = useState(null);
    const [aadharimg, Setaadharimg] = useState('');
    const [pandoctype,Setpandoctype] = useState(''); 
    const [SuccessApiRes,SetSuccessApiRes] = useState("");
    const [access,Setaccess] = useState(false)
    const [disabled,disabledbtn] = useState(false)
    const [kradata,Setkradata] = useState({
        Address:"Loading..",
        Genter:"Loading..",
        dob:"Loading..",
        FatherName:"Loading..",
        Name:"Loading..",
        CAddress:"Loading..",
        phone:"Loading..",

    })
    const [apires,Setapires] = useState(false);
    const [Upload,SetUpload] = useState(false);
    const [camaccess,Setcamaccess] = useState('')

    const getkradata = async () => {
        try {
            const getData = await AxiosInstance.post("signup/kra/data/get",
            {
                "phone": 8369747962,
                "pan": "BFMPC9409P",
                "dob": "11/10/1997" 
            },
                {
                    headers: {
                        // session_id: props.session_id,
                        session_id: "82275b0c-9f2c-4c7b-9dc0-1972f4f55064"
                    },
                }
            );
            const resp = await getData.data;
            console.log(getData)
            if (getData.status == 200) {
                Setkradata({
                    Name:resp.name.toLowerCase(),
                    FatherName:resp.fathers_name.toLowerCase(),
                    dob:resp.dob,
                    Genter:resp.gender.toLowerCase(),
                    Address: resp.permanent_address.toLowerCase(),
                    CAddress: resp.correspondence_address.toLowerCase(),
                    phone: resp.phone
                });
                disabledbtn(false);
            }

        } catch (error) {   
        }[]
    };
    
    useEffect(() => {
       var lineItem = document.querySelectorAll(".animate__animated");
        lineItem.forEach((item, index) => {
          item.className += " animate__fadeInUp animate__delay_" + index;
        });
        getkradata();
        getaadharimg();
    }, []);

    const pull_data = (data) => {
        if(data == 'camstatus'){
            Setaccess(true);
            SetUpload(false)
        }
        else{
            const base64Data = data;
            const [,type] = base64Data.split(';')[0].split('/');
            Setpancardimg(base64Data);
            Setpandoctype(type);
            props.toggleModal();
            Setuploadscreen(false);
            Setuplodedscreen(true);
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
    
    const PanContinue = async (data) => {
        setisLoading(true)
        let PhoneNum = 7020577995;
        try {
            const APIData =   {
                "phone": PhoneNum,
                "file": pancardimg
            };
            console.log(APIData);
            const getData = await AxiosInstance.post("signup/user/pan/upload?phone="+ PhoneNum,
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
                toggleModal();
                SetUpload(false);
                Setapires(true)
            }
            

        } catch (error) {
            
            
            setisLoading(false);
            SetSuccessApiRes(error.message);
            toggleModal();
            SetUpload(false);
            Setapires(true)
            
        }[]
    }


    
    const getaadharimg = () => {
        if (localStorage.getItem('aadharimg') !== null) {
            const img = localStorage.getItem("aadharimg");
            Setaadharimg(img)
        }
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
                {uploadscreen &&(
                    <>
                        <h2 className="title animate__animated">Upload PAN card</h2>
                        <p className="subTitle animate__animated">Click a photo of your PAN card or upload from files.</p>
                        <div className={`animate__animated ${styles.RememberList}`}>
                            <h3 className={styles.ListTitle}>Please remember:</h3>
                            <div className={styles.steps}>
                                <div className={styles.stepsicon}>
                                    <span className='icon-Signature-box'></span>
                                </div>
                                <p className={styles.steptext}>Upload only the front-side of your PAN card.</p>
                            </div>
                            <div className={styles.steps}>
                                <div className={styles.stepsicon}>
                                    <span className='icon-Image'></span>
                                </div>
                                <p className={styles.steptext}>Photo size must not exceed 2 MB each.</p>
                            </div>
                            <div className={styles.steps}>
                                <div className={styles.stepsicon}>
                                    <span className='icon-clear-picture'></span>
                                </div>
                                <p className={styles.steptext}>Photo must be well-lit and glare-free.</p>
                            </div>
                            <div className={styles.steps}>
                                <div className={styles.stepsicon}>
                                    <span className='icon-Image'></span>
                                </div>
                                <p className={styles.steptext}>Photo must be clear.</p>
                            </div>
                        </div>
                        <div className="animate__animated btn-sticky">
                            <ButtonUI type={"submit"} onClick={() => {toggleModal(),SetUpload(true),Setaccess(false)}}> Continue </ButtonUI>
                        </div>
                    </>
                )}
                {uplodedscreen && (
                    <>
                        <h2 className="title animate__animated">Confirm your details</h2>
                        <p className="subTitle animate__animated">These details are required by SEBI to open your demat account.</p>
                        <div className={`animate__animated ${styles.detailsBox}`}>
                            <div className={styles.detailsBoxrow}>
                                <div className={styles.detailsBoxtitle}>Name</div>
                                <div className={styles.detailsBoxvalue}>{kradata.Name}</div>
                            </div>
                            <div className={styles.detailsBoxrow}>
                                <div className={styles.detailsBoxtitle}>Father's Name</div>
                                <div className={styles.detailsBoxvalue}>{kradata.FatherName}</div>
                                <a className={styles.editbtn }>Edit <span className={`icon-Arrow ${styles.arrow}`}></span></a>
                            </div>
                            <div className={styles.detailsBoxrow}>
                                <div className={styles.detailsBoxtitle}>DOB</div>
                                <div className={styles.detailsBoxvalue}>{kradata.dob} </div>
                            </div>
                            <div className={styles.detailsBoxrow}>
                                <div className={styles.detailsBoxtitle}>Gender</div>
                                <div className={styles.detailsBoxvalue}>{kradata.Genter}</div>
                            </div>
                            <div className={styles.detailsBoxrow}>
                                <div className={styles.detailsBoxtitle}>Address</div>
                                <div className={styles.detailsBoxvalue}>{kradata.Address}</div>
                            </div>
                        </div>

                        <div className={`animate__animated ${styles.UploadBoxwrap}`}>
                            {aadharimg &&(
                                <button className={styles.UploadBox}>
                                    {pandoctype == 'pdf' && (
                                        <iframe className={styles.Aadharimg} src={aadharimg} alt="" ></iframe>
                                    )}
                                    {pandoctype != 'pdf' && (
                                        <img className={styles.Aadharimg} src={aadharimg} alt="" />
                                    )}
                                    <a className={`icon-Edit ${styles.Editaadhar}`}></a>
                                </button>
                            )}
                            <button className={styles.UploadBox} onClick={() => {toggleModal(),SetUpload(true);Setapires(false);Setcamaccess('')}}>
                                {pandoctype == 'pdf' && (
                                    <iframe className={styles.Aadharimg} src={pancardimg} alt="" ></iframe>
                                )}
                                {pandoctype != 'pdf' && (
                                    <img className={styles.Aadharimg} src={pancardimg} alt="" />
                                )}
                                <a className={`icon-Edit ${styles.Editaadhar}`}></a>
                            </button>
                        </div>
                        <div className="animate__animated btn-sticky">
                            <ButtonUI type={"submit"} disabled={disabled} onClick={PanContinue}> Continue </ButtonUI>
                        </div>
                    </>
                )}
                {showModal && (
                    <>
                        {Upload == true && (
                            <Modal ModalType="signature_modal" onClick={toggleModal}>
                                <UploadpanPop func={pull_data} camaccess={camaccess} />
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
    )}
const mapStateToProps = (state) => {
    return {
      showModal: state.modalReducer.showModal,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      toggleModal: () => {dispatch(TOGGLE_MODAL())},
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploadpan);
