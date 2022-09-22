import React,{useEffect} from 'react'
import Header from '../../global/Header.component';
import styles from '../WelcomToVentura/Welcome.module.css';
import ButtonUI from "../../ui/Button.component";
import Link from 'next/link';
import { useRouter } from 'next/router'
const WelcomComponent = () => {
  const router = useRouter();
  useEffect(() => {
    var lineItem = document.querySelectorAll(".animate__animated");
    lineItem.forEach((item, index) => {
      item.className += " animate__fadeInUp animate__delay_" + index;
    });
  }, []);
  return (
    <>
      <Header />
      <section className="ContainerBG">
        <div className="bgtop">
            <img src="/images/welcomebgtop.png" alt='lines'/>
        </div>
        <div className="bgbottom">
            <img src="/images/welcomebgbottom.png" alt='lines'/>
        </div>

        <div className="containerMini">
          <h2 className="animate__animated title">Here’s what’s next</h2>
          <div className={styles.stepsWrap}>
            {/* <div className={`animate__animated ${styles.Completedsteps}`}> */}
            <div className={`animate__animated ${styles.steps}`}>
              <div className={styles.stepsicon}>
                <span className='icon-Complete-your-e-KYC'></span>
              </div>
              <div>
                <h3 className={styles.Ca_Subtitle}>Complete your e-KYC</h3>
                <p className={styles.Ca_Subtitletext}>Keep your Aadhaar and PAN card handy</p>
              </div>
            </div>

            <div className={`animate__animated ${styles.steps}`}>
              <div className={styles.stepsicon}>
                <span className='icon-Set-up-your-profile'></span>
              </div>
              <div>
                <h3 className={styles.Ca_Subtitle}>Set up your profile</h3>
                <p className={styles.Ca_Subtitletext}>Answer a few questions about yourself</p>
              </div>
            </div>

            <div className={`animate__animated ${styles.steps}`}>
              <div className={styles.stepsicon}>
                <span className='icon-Link-your-bank-account'></span>
              </div>
              <div>
                <h3 className={styles.Ca_Subtitle}>Link your bank a/c</h3>
                <p className={styles.Ca_Subtitletext}>Speed up your deposits and withdrawals</p>
              </div>
            </div>

            <div className={`animate__animated ${styles.steps}`}>
              <div className={styles.stepsicon}>
                <span className='icon-Confirm-its-you'></span>
              </div>
              <div>
                <h3 className={styles.Ca_Subtitle}>Confirm it&apos;s you</h3>
                <p className={styles.Ca_Subtitletext}>Upload your photo and signature</p>
              </div>
            </div>

            <div className={`animate__animated ${styles.steps}`}>
              <div className={styles.stepsicon}>
                <span className='icon-eSign-and-Login'></span>
              </div>
              <div>
                <h3 className={styles.Ca_Subtitle}>eSign and Login</h3>
                <p className={styles.Ca_Subtitletext}>Sign your application and start investing</p>
              </div>
            </div>
          </div>
          <div className="animate__animated">
            <ButtonUI onClick={()=>router.push("/co/pan")} type={"submit"}> Create account </ButtonUI>
          </div>
          
          <div className={`animate__animated ${styles.Reminder}`}>
            <p className={styles.text}>Don&apos;t have everything ready?</p>
            <Link href="/"><a className={styles.link}>Set a reminder</a></Link>
          </div>
           
        </div>
      </section>
    </>
  )
}

export default WelcomComponent