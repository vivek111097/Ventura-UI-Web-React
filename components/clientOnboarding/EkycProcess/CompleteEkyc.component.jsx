import React,{useEffect} from 'react'
import Header from '../../global/Header.component'
import ButtonUI from '../../ui/Button.component'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import styles from './CompleteEkyc.module.css'



const CompleteEkyc = (props) => {
  const router = useRouter();


  

  const handalDigiLocker= async()=>{

    // window.open(
    //   `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&
    //   client_id=${process.env.digilockerClientID}&
    //   redirect_uri=${process.env.digilockerRedirectUrl}&
    //   state=${props.phone}`,
    // 'popup',`width=600,height=600`);
    console.log(`https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&
    client_id=${process.env.digilockerClientID}&
    redirect_uri=${process.env.digilockerRedirectUrl}&
    state=${props.phone}`);
    router.push(`https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&
       client_id=${process.env.digilockerClientID}&
       redirect_uri=${process.env.digilockerRedirectUrl}&
       state=${props.phone}`);
  }
  const startKRA=()=>{
    router.push('/kra')
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

            <ButtonUI onClick={handalDigiLocker}>Start e-KYC</ButtonUI>
          </div>

          <h3 onClick={startKRA} className={styles.textPrimary}>Mobile not linked with Aadhaar</h3>
        </div>
      </section>
    </>
  )
}





const mapStateToProps = (state) => {
  return {
    pan: state.LandingReducer.user.pan.pan,
    phone: state.LandingReducer.user.phone,
    showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteEkyc);