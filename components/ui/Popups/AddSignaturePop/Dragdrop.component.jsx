import React, {useState,useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './AddSignaturePop.module.css';

function MyDropzone() {

  const onDrop = useCallback(acceptedFiles => {

  }, []);
   
  const {getRootProps, getInputProps,fileRejections, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
        'image/jpeg': [],
        'image/png': []
      },
      maxSize:85000,
      onDrop
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
        {fileRejectionItems}
        {acceptedFileItems}
         
    </div>
  );
}
export default MyDropzone