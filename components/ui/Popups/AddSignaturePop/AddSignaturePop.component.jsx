import Link from "next/link";
import React, { useState } from "react";
import styles from './AddSignaturePop.module.css';
import Signature from "./Signature.component";
import MyDropzone from "./Dragdrop.component";
import ButtonUI from "../../Button.component";
import AxiosInstance from "../../../../Api/Axios/axios";

const AddSignaturePopup = () =>{
    const [ToggleState, setToggleState] = useState(1);
    const [Sign ,SetSign] = useState(null);
    const [Signtype,SetSigntype] = useState('');
    const [ApiRes,SetApiRes] = useState("")
    const toggleTab = (index) => {
      setToggleState(index);
    };
    
    const getActiveClass = (index, className) => ToggleState === index ? className : "";

    const pull_data = (data) => {
        SetSign(data)
        const base64Data = data;
        const [,type] = base64Data.split(';')[0].split('/');
        SetSigntype(type);
    }

    const onSubmit = async (data) => {
        try {
            const APIData = {
                "phone": 7020577995,
                "file":Sign 
            };
            console.log(APIData);
            const getData = await AxiosInstance.post(
                "/signup/user/signature/upload",
                APIData,
                {
                    headers: {
                        // session_id: props.session_id,
                        session_id: "969b45fc-127f-4247-88a8-5fd9e5cf3529",
                    },
                }
            );
            const res = await getData.data;
            console.log(res);
            if (getData.status == 200) {
                SetApiRes(res.message)
            }

        } catch (error) {
            SetApiRes(error.response.data.message);
        }
    }
    const UploadPhoto = (event) =>{
        event.preventDefault();
        SetSign(null)
    }

    return(
        <>
            {Sign == null && (
                <div className="SignAdd">
                    <div className="textCenter">
                        <h2 className="title">Add your signature</h2>
                        <p className="subTitle">Upload an image or use the signature-box to sign</p>
                    </div>
                    <div className={styles.tabwrap}>
                        <ul className={styles.tablist}>
                            <li className={`tabs ${getActiveClass(1, "activetabs")}`} onClick={() => toggleTab(1)}>
                                Upload photo
                            </li>
                            <li className={`tabs ${getActiveClass(2, "activetabs")}`} onClick={() => toggleTab(2)}>
                                Use signature box
                            </li>
                        </ul>
                        
                        <div className="tabcontainer">
                            <div className={`content ${getActiveClass(1, "active-content")}`}>
                                <MyDropzone func={pull_data} />
                                <div className={styles.orupload}>
                                    <span className={styles.spantxt}>OR upload via</span>
                                </div>
                                <div className={styles.Others}>
                                    <Link href="/"><a className={styles.OtherOptions}><img src="/images/google.png" alt='socail_media_icons'/></a></Link>
                                    <Link href="/"><a className={styles.OtherOptions}><img src="/images/dropbox.png" alt='socail_media_icons'/></a></Link>
                                    <Link href="/"><a className={styles.OtherOptions}><img src="/images/apple.png" alt='socail_media_icons'/></a></Link>
                                </div>
                            </div>
                            <div className={`content ${getActiveClass(2, "active-content")}`}>
                                <Signature func={pull_data} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {Sign && (
                <div className="SignAdded">
                    <div className="textCenter">
                        <h2 className="title">Signature added</h2>
                        <p className="subTitle">Use the same signature as on your PAN. </p>
                    </div>
                    <div className={styles.SignBox}>
                        {Signtype == 'pdf' && (
                            <iframe className={styles.SignBoxFrame} src={Sign}></iframe>
                        )}
                        {Signtype != 'pdf' && (
                            <img className={styles.SignBoxImg} src={Sign} />
                        )}
                        <button className={styles.resetsignature}>
                            <img src="/images/resetsignature.png" />
                        </button>
                        
                    </div>
                    
                    <div className={styles.lookingDiff}>
                        <p>Signature looking different?</p>
                        <a href="" onClick={UploadPhoto} className={styles.UploadPhoto}>Upload Photo</a>
                    </div>
                    {ApiRes && (
                        <p className="center">{ApiRes}</p>
                    )}
                    {!ApiRes && (
                        <div className={styles.btnwrap}>
                            <ButtonUI onClick={onSubmit} type={"submit"}>Continue</ButtonUI>
                        </div>
                    )}
                    
                    
                </div>  
            )}
        </>
    )
}
export default AddSignaturePopup