import React from 'react'
import Header from '../../global/Header.component';
import styles from '../WelcomToVentura/Welcome.module.css';
import ButtonUI from "../../ui/Button.component";
import Link from 'next/link';
const WelcomComponent = () => {
  return (
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
          <h2 className={styles.title}>Welcome to Ventura</h2>
          <div className={styles.steps}>
            <div className={styles.stepsicon}>
              <span className='icon-react'></span>
            </div>
            <div className={styles.steptext}>
              <h3 className={styles.Ca_Subtitle}>Complete e-KYC</h3>
              <p className={styles.Ca_Subtitletext}>Keep your Aadhaar and PAN card handy</p>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.stepsicon}>
              <span className='icon-react'></span>
            </div>
            <div className={styles.steptext}>
              <h3 className={styles.Ca_Subtitle}>Set up your profile</h3>
              <p className={styles.Ca_Subtitletext}>Answer a few questions about yourself</p>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.stepsicon}>
              <span className='icon-react'></span>
            </div>
            <div className={styles.steptext}>
              <h3 className={styles.Ca_Subtitle}>Link your bank a/c</h3>
              <p className={styles.Ca_Subtitletext}>Speed up your deposits and withdrawals</p>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.stepsicon}>
              <span className='icon-react'></span>
            </div>
            <div className={styles.steptext}>
              <h3 className={styles.Ca_Subtitle}>Confirm it&apos;s you</h3>
              <p className={styles.Ca_Subtitletext}>Upload your photo and signature</p>
            </div>
          </div>

          <div className={styles.steps}>
            <div className={styles.stepsicon}>
              <span className='icon-react'></span>
            </div>
            <div className={styles.steptext}>
              <h3 className={styles.Ca_Subtitle}>eSign and Login</h3>
              <p className={styles.Ca_Subtitletext}>Sign your application and start investing</p>
            </div>
          </div>

      <Link href={"/co/pan"}><ButtonUI type={"submit"}> Create account </ButtonUI></Link>
          <div className={styles.Reminder}>
            <p className={styles.text}>Don&apos;t have everything ready?</p>
            <Link href="/"><a className={styles.link}>Set a reminder</a></Link>
          </div>
           
        </div>
      </section>
    </>
  )
}

export default WelcomComponent