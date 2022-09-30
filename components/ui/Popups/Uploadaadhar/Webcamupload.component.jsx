import React,{useState} from "react";
import Webcam from "react-webcam";
import styles from './UploadaadharPop.module.css';
import ButtonUI from "../../Button.component";

const Webcamupload = (props) => {
    const webcamRef = React.useRef(null);
    const [isShowCam, setisShowCam] = useState(true);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if(imageSrc){
            props.func(imageSrc)
            setisShowCam(false);
        }
    }, [webcamRef]);
     
     
    const videoConstraints = {
        width: 553,
        height: 422,
        facingMode: "environment"
        // facingMode: { exact: "environment" }
      };

    const[side] = useState(props.cardside);
    
    const closeCam = (e) =>{
        e.preventDefault();
        setisShowCam(false);
        props.func('closeCam')
    }
    return(
        <>
        {isShowCam &&(
            <div className={styles.clickpic}>
                <div className={styles.overlay}>
                    <a href="" className={styles.CloseCam} onClick={closeCam}>
                        <span className="icon-Close"></span>
                    </a>
                    {side == 'front' &&(
                        <p className={styles.topframetxt}>1/2: Aadhaar {side}</p>
                    )}
                    {side == 'back' &&(
                        <p className={styles.topframetxt}>2/2: Aadhaar {side}</p>
                    )}
                    
                    <Webcam className={styles.webcam} ref={webcamRef} audio={false} videoConstraints={videoConstraints} screenshotFormat="image/jpeg" />
                    <p className={styles.botframetxt}>Align {side}-side of your Aadhaar card inside the rectangle and click photo </p>
                    <div className={styles.frame}>
                        <img src="/images/cameraoverlay.png" />
                    </div>
                     
                </div>
                <div className={styles.btnwrap}>
                    <ButtonUI onClick={capture}>Click photo</ButtonUI>
                </div>
                 
                
            </div>
        )}
        </>
    )
}
    
export default Webcamupload