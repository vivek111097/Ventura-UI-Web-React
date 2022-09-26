import React from 'react'
import Header from '../../global/Header.component'
import ButtonUI from '../../ui/Button.component'

import styles from './CompleteEkyc.module.css'

const CompleteEkyc = () => {
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
          <h2 className='title'>Complete your e-KYC</h2>
          <p className='subTitle'>Make sure your mobile number is linked to your Aadhaar card.</p>

          <p><a href='' className='btnLInk'><u>How to link Aadhaar with mobile?</u></a></p>

          <div className={styles.card}>
            <h3 className={styles.cardTtitle}>How this works?</h3>

            <ul className={styles.iconList}>
              <li>
                <div className={styles.iconListPic}>
                  <img src="/images/digi_locker.svg" alt="" />
                </div>
                You will be redirected to Digilocker for e-KYC.
              </li>

              <li>
                <div className={styles.iconListPic}>
                  
                </div>
                It is a Govt of India initiative with 92.28 million trusted users.
              </li>

              <li>
                <div className={styles.iconListPic}>
                  <img src="/images/aadhar-icon.svg" alt="" />
                </div>
                You won’t need to enter your details manually as the required documents will be fetched. 
              </li>
            </ul>
          </div>


          <div className={styles.my}>
            <ButtonUI>Start e-KYC</ButtonUI>
          </div>

          <h3 className={styles.textPrimary}>Mobile not linked with Aadhaar</h3>
        </div>
      </section>
    </>
  )
}

export default CompleteEkyc