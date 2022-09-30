import Link from "next/link";
import React, { useState,useEffect } from "react";
import styles from './UploadaadharPop.module.css';
import Dragdropaadhar from "./Dragdropaadhar.component";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ButtonUI from "../../Button.component";
import Webcamupload from "./Webcamupload.component";


const UploadaadharPop = (props) =>{

    const [ToggleState, setToggleState] = useState(1);
    const [image, setImage] = useState(null);
    const [cropper, setCropper] = useState("");
    const [cropData, setCropData] = useState("");
    const [doctype,Setdoctype] = useState('');
    const [opencam,Setopencam] = useState(false);
    const[side] = useState(props.cardside)
    const [filesource,Setfilesource] = useState('Upload');
    const toggleTab = (index) => {
      setToggleState(index);
    };
    const pull_data = (data) => {
        if(data =='closeCam'){
            Setopencam(false); 
        }else{
            const base64Data = data;
            const [,type] = base64Data.split(';')[0].split('/');
            Setdoctype(type);
            setImage(base64Data);
                
            if(type =='pdf'){
                setCropData(base64Data);
            }
        }
    }
    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            setImage("");
        }
    };
    const RestPic = () =>{
        setImage(null);
        setCropData("");
        Setopencam(false);
    }
    const SelectCamera = (e) =>{
        e.preventDefault();
        if (navigator.mediaDevices.getUserMedia) {
            const successCallback = function(stream) {
                setImage(null);
                setCropData("");
                setToggleState(2);
                Setopencam(true);
                Setfilesource('Camera');
            };
            const errorCallback = function(error) {
                props.func('camstatus');
            };
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: { facingMode: { ideal: 'environment' } }
            }).then(successCallback, errorCallback);
        }
    }
    const SelectFile =(e) =>{
        e.preventDefault();
        Setopencam(false);
        setToggleState(1);
        setImage(null);
        setCropData("");
        Setfilesource('Upload')
    }
    const UploadPhoto = (e) =>{
        e.preventDefault();
        props.func(cropData);
        Setopencam(false);
    }
    const getActiveClass = (index, className) => ToggleState === index ? className : "";
    
    const startCam = () => {
        if (navigator.mediaDevices.getUserMedia) {
            const successCallback = function(stream) {
                Setopencam(true);
            };
            const errorCallback = function(error) {
                props.func('camstatus');
            };
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: { facingMode: { ideal: 'environment' } }
            }).then(successCallback, errorCallback);
        }
        // Setopencam(true);
    }
    useEffect(() => {
        const CamPermission = props.camaccess;
        if(CamPermission == 'Permission'){
            Setopencam(true);
            Setfilesource('Camera');
        }
     }, []);
   
    return(
        <>
        {image == null && opencam == false && (
            <div className="SignAdd">
                <div className="textCenter">
                    <h2 className="title">Upload document {side}</h2>
                    <p className="subTitle">Click a photo of your Aadhaar card or upload it from files.</p>
                </div>
                <div className={styles.tabwrap}>
                    <ul className={styles.tablist}>
                        <li className={`tabs ${getActiveClass(1, "activetabs")}`} onClick={() => {toggleTab(1);Setfilesource('Upload')}}>
                            Upload photo
                        </li>
                        <li className={`tabs ${getActiveClass(2, "activetabs")}`} onClick={() => {toggleTab(2);Setfilesource('Camera')}}>
                            Use camera
                        </li>
                    </ul>
                    
                    <div className="tabcontainer">
                        <div className={`content ${getActiveClass(1, "active-content")}`}>
                            <Dragdropaadhar func={pull_data} />
                            <div className={styles.orupload}>
                                <span className={styles.spantxt}>OR upload via</span>
                            </div>
                            <div className={styles.Others}>
                                <Link href=""><a className={styles.OtherOptions}><img src="/images/google.png" alt='socail_media_icons'/></a></Link>
                                <Link href=""><a className={styles.OtherOptions}><img src="/images/dropbox.png" alt='socail_media_icons'/></a></Link>
                                <Link href=""><a className={styles.OtherOptions}><img src="/images/apple.png" alt='socail_media_icons'/></a></Link>
                            </div>
                        </div>
                        <div className={`content ${getActiveClass(2, "active-content")}`}>
                            <div className={styles.OpenCam} onClick={startCam}>
                                <div className={styles.camicon}>
                                    <span className="icon-camera"></span>
                                </div>
                                <p className={styles.btntext}>Open camera</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {opencam &&(
            <Webcamupload func={pull_data} cardside={side}/>
        )}
        {image && doctype != 'pdf' &&(
            <div className="SignAdd">
                <div className="textCenter">
                    <h2 className="title">Aadhaar-{side} selected</h2>
                    <p className="subTitle">Proceed only if the contents of the photo are clearly visible.</p>
                </div>
                <Cropper style={{ height: 302, width: "100%",background:"white"}}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    guides={true}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
                <div className={styles.btnwrap}>
                    <ButtonUI onClick={getCropData} type={"submit"}>Continue</ButtonUI>
                </div>
            </div>
        )}
        {cropData && (
            <div className="SignAdd">
                <div className="textCenter">
                    <h2 className="title">Aadhaar-{side} selected</h2>
                    <p className="subTitle">Proceed only if the contents of the photo are clearly visible.</p>
                </div>
                <div className={styles.SignBox}>
                    {doctype == 'pdf' && (
                        <iframe className={styles.AadharBoxImg} src={cropData} ></iframe>
                    )}
                    {doctype != 'pdf' && (
                        <img className={styles.AadharBoxImg} src={cropData} />
                    )}
                    <button onClick={RestPic} className={styles.resetsignature}>
                        <img src="/images/resetsignature.png" />
                    </button>
                </div>
                <div className={styles.lookingDiff}>
                    <p>Poor photo quality?</p>
                    {filesource == 'Upload' &&(
                        <a href="" onClick={SelectCamera} className={styles.UploadPhoto}>Click a photo</a>
                    )}
                    {filesource =='Camera' &&(
                        <a href="" onClick={SelectFile} className={styles.UploadPhoto}>Select from files</a>
                    )}
                    
                    
                    
                </div>
                <div className={styles.btnwrap}>
                    <ButtonUI onClick={UploadPhoto} type={"submit"}>Upload</ButtonUI>
                </div>
            </div>
        )}
        </>
    )
}
export default UploadaadharPop