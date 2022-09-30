import React from 'react';
import ButtonUI from '../../Button.component';
import styles from './Accessdenied.module.css';
const Accessdenied = (props) => {
  const Enableaccess = () =>{
    if (navigator.mediaDevices.getUserMedia) {
      const successCallback = function(stream) {
        props.func('Permission');
      };
      const errorCallback = function(error) {
        console.log('fail')
      };
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' } }
      }).then(successCallback, errorCallback);
    }
  }
  const UploadPhoto = (e) =>{
    e.preventDefault();
    props.func('UploadPhoto');
  }
  return (
    <div className="textCenter">
        <span className={`icon-Access-denied ${styles.icon}`}></span>
        <h1 className="title">Access denied</h1>
        <p className={styles.popsubTitle}>Access to camera is necessary for the following step.</p>
        <div className={styles.btnwrap}>
            <ButtonUI type={"submit"} onClick={Enableaccess}>Enable access</ButtonUI>
        </div>
        <div className={styles.UploadPhotowrap}>
          <a href='' className={styles.UploadPhoto} onClick={UploadPhoto}>Upload photo</a>
        </div>
    </div> 
  );
}

export default Accessdenied;
