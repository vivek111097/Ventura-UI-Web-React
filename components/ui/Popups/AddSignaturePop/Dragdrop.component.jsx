import React, {useState,useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './AddSignaturePop.module.css';

function MyDropzone(data) {
  const [errorMsg, SeterrorMsg] = useState('');
  
  const onDrop = useCallback((acceptedFiles,fileRejections) => {
    if(fileRejections.length == 1){
      SeterrorMsg(fileRejections[0].errors[0].message)
    }
    if(fileRejections.length > 1){
      SeterrorMsg(fileRejections[0].errors[0].message)
    }
    if(acceptedFiles.length){
      SeterrorMsg(null)
      let file = acceptedFiles[0];
      getBase64(file);
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
    maxSize:85000,
    onDrop,
    multiple: false
  });
  
  const acceptedFileItems = acceptedFiles.map(file => (
    <p className={styles.InfoText} key={file.path}>
      {file.path} - {file.size} bytes
    </p>
  ));
 
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <p key={file.path} className={styles.ErrorInfoText}>{errors.map(e => (e.message))}</p>
  ));

  return (
    <div className={styles.FileBox} {...getRootProps()}>
        <img src="/images/gallery_import.png" alt='lines'/>
        <h3 className={styles.Titletext}>Drop your file here or <button className={styles.Browse} type="button" onClick={open}> Browse </button>
        </h3>
        <p className={styles.InfoText}>Supported files: jpeg, png, pdf</p>
        <input {...getInputProps()} />
        <p className={styles.ErrorInfoText}>{errorMsg}</p>
        
        {/* {fileRejectionItems}
        {acceptedFileItems} */}
         
    </div>
  );
}

export default MyDropzone