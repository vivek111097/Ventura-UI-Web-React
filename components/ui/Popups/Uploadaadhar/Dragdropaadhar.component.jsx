import { reduceRight } from 'ramda';
import React, {useState,useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './UploadaadharPop.module.css';

function Dragdropaadhar(data) {
  const [errorMsg, SeterrorMsg] = useState('');

  const onDrop = useCallback((acceptedFiles,fileRejections) => {
    
    if(fileRejections.length == 1){
      let errormsg = fileRejections[0].errors[0].code;
      console.log(errormsg)
      if(errormsg == 'file-too-large'){
        SeterrorMsg('file size should not be greater than 5mb');
      }
      if(errormsg == 'file-invalid-type'){
        SeterrorMsg('File type must be jpeg, png, pdf');
      }
    }

    if(fileRejections.length > 1){
      SeterrorMsg(fileRejections[0].errors[0].message)
    }

    if(acceptedFiles.length){
      
      SeterrorMsg(null)
      let file = acceptedFiles[0];

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = ()=> {
          let  files = new Blob([reader.result], { type: "application/pdf" });
          files.text().then((x) => {
            if(x.includes("Encrypt")){
              SeterrorMsg('File is Password Protedted');              
            }
            else{
              getBase64(file)
            }
          });
        };

      
    }
  }, []);

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      data.func(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  const {getRootProps, getInputProps,fileRejections, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'application/pdf': []
    },
    maxSize:1e+6,
    onDrop,
    multiple: false
  });
  
  return (
    <div className={styles.FileBox} {...getRootProps()}>
        <img src="/images/gallery_import.png" alt='lines'/>
        <h3 className={styles.Titletext}>Drop your file here or <button className={styles.Browse} type="button" onClick={open}> Browse </button>
        </h3>
        <p className={styles.InfoText}>Supported files: jpeg, png, pdf</p>
        <input {...getInputProps()} />
        <p className={styles.ErrorInfoText}>{errorMsg}</p>
         
    </div>
  );
}

export default Dragdropaadhar