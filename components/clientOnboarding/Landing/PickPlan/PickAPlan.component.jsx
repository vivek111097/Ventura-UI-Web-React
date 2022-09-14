import React from "react";
import Header from "../../../global/Header.component";
import styles from "./PickAPlan.module.css";
import ButtonUI from "../../../ui/Button.component";

const PickAPlan = () => {
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
          <h2 className="title">Pick a plan</h2>
          <p className="subTitle">
            Save 12% extra in year 1 by choosing to pay at once.
          </p>

          <div className={styles.plans}>
            <label className={styles.plan} htmlFor="basic">
              <input type="radio" name="plan" id="basic" defaultChecked/>
              <div className={styles.planContent}>
                <img
                  loading="lazy"
                  src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/life-saver-img.svg"
                  alt=""
                />
                <div className={styles.planDetails}>
                  <span>Basic</span>
                  <p>
                    For smaller business, with simple salaries and pay
                    schedules.
                  </p>
                </div>
              </div>
            </label>

            <label className={styles.plan} htmlFor="complete">
              <input type="radio" id="complete" name="plan" />
              <div className={styles.planContent}>
                <img
                  loading="lazy"
                  src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/potted-plant-img.svg"
                  alt=""
                />
                <div className={styles.planDetails}>
                  <span>Complete</span>
                  <p>
                    For growing business who wants to create a rewarding place
                    to work.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <ButtonUI type={"submit"}>Continue</ButtonUI>
        </div>
      </section>
    </>
  );
};

export default PickAPlan;
