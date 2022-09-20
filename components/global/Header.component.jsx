import React from 'react'
import Link from 'next/link';
import styles from '../../styles/Header.module.css';
import { Router } from 'next/router';
const Header = () => {

return (
    <>
        <header className={styles.welcomeHead}>
            <div className={styles.welcomeHeadRow}>
                <Link href={'/'}>
                    <a className={styles.BackButton}>+</a>
                </Link>
                <Link href={'/'}>
                    <a>
                        <img src="/images/VenturaLogoWhite.png" alt="Ventura Logo" className={styles.logo} />
                    </a>
                </Link>
                <div className={styles.SandTimer}>
                    <Link href={'/'}>
                        <a className={styles.SandTimerA}>
                            <img src="/images/SandTimer.png" alt="Sand Timer" />
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    </>
  )
}
export default Header