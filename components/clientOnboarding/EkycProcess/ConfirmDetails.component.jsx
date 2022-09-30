import React from 'react'
import Header from '../../global/Header.component'
import ButtonUI from '../../ui/Button.component'
import styles from './CompleteEkyc.module.css'
import { useRouter } from 'next/router'

const ConfirmDetails = () => {
    const router = useRouter()
    const handelEkyc=()=>{
        router.push('co/kyc/completed-ekyc')
    }
    return (
        <>

            {/* header start */}
            <Header />
            {/* header end */}


            {/* container start */}
            <section className="ContainerBG">

                {/* body bg */}
                <div className="bgtop">
                    <img src="/images/welcomebgtop.png" />
                </div>
                <div className="bgbottom">
                    <img src="/images/welcomebgbottom.png" />
                </div>

                {/* body bg */}

                {/* mini container */}
                <div className="containerMini">
                    <h2 className='title'>Confirm your details</h2>
                    <p className='subTitle'>We have fetched these details from Digilocker.</p>



                    <div className={`${styles.card} ${styles.noPad}`}>

                        <div className={styles.cardHeader}></div>

                        <div className={styles.cardBody}>
                            <ul className={styles.confirmDetailsList}>
                                <li>
                                    <div className={styles.label}>
                                        Name
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            Mr. Arvind Mohan Nath
                                        </div>

                                    </div>
                                </li>

                                <li>
                                    <div className={styles.label}>
                                        Father’s Name
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            Mr. Mohan Nath
                                        </div>
                                        <a className={styles.editLink}>Edit</a>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.label}>
                                        DOB
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            18.10.1998
                                        </div>

                                    </div>
                                </li>

                                <li>
                                    <div className={styles.label}>
                                        Gender
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            Male
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.label}>
                                        Address
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            42 B Bharti, MG Road,
                                            Bandra, Mumbai - 400023
                                        </div>

                                    </div>
                                </li>

                                <li>
                                    <div className={styles.label}>
                                        Aadhaar No.
                                    </div>

                                    <div className={styles.data}>
                                        <div className={styles.dataValue}>
                                            XXXX XXXX 8373
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className={styles.pdetails}>
                        <div className={styles.pdetailsPic}>
                            <img src="/images/personal_card.svg" alt="" />
                        </div>
                        PAN linked with your Aadhaar Card

                        <a className={styles.editLink}>
                            View
                        </a>

                    </div>

                    <ButtonUI onClick={handelEkyc}>Continue</ButtonUI>

                </div>
            </section>
        </>
    )
}

export default ConfirmDetails