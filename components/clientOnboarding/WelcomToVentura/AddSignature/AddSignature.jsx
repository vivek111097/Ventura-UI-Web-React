import React from "react";
import Header from '../../../global/Header.component';
import ButtonUI from "../../../ui/Button.component";
import styles from './Signature.module.css';
const AddSignature = () =>{
    return(
        <>
        <Header />
        <section className="ContainerBG">
            <div className="bgtop">
                <img src="/images/welcomebgtop.png" />
            </div>
            <div className="bgbottom">
                <img src="/images/welcomebgbottom.png" />
            </div>

            <div className="containerMini">
                <h2 className="title">Add your signature</h2>
                <p className="subTitle">Use the signature-box to sign using your mouse/finger/stylus.</p>
                <div className={styles.RememberList}>
                    <h3 className={styles.ListTitle}>Please remember:</h3>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>Signature-box opens in landscape mode.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>Signature must match with the one on your Aadhaar/PAN card.</p>
                    </div>
                    <div className={styles.steps}>
                        <div className={styles.stepsicon}>
                            <span className='icon-react'></span>
                        </div>
                        <p className={styles.steptext}>For uploading photo, the size limit is 2 MB.</p>
                    </div>
                </div>
                <ButtonUI type={"submit"}> Continue </ButtonUI>
            </div>
        </section>
        </>
    )
}
export default AddSignature