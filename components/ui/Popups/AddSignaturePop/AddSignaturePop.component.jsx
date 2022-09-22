import Link from "next/link";
import React, { useState } from "react";
import styles from './AddSignaturePop.module.css';
import Signature from "./Signature.component";
import MyDropzone from "./Dragdrop.component";

const AddSignaturePopup = () =>{
    const [ToggleState, setToggleState] = useState(1);
     
    const toggleTab = (index) => {
      setToggleState(index);
    };
    
    const getActiveClass = (index, className) => ToggleState === index ? className : "";
    
    return(
        <>
        <div className="textCenter">
            <h2 className="title">Add your signature 123</h2>
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
                    <MyDropzone />
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
                    <Signature />
                </div>
            </div>
        </div>
             
        
        </>
    )
}
export default AddSignaturePopup