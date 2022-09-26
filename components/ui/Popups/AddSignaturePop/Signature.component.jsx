import React,{useState} from "react";
import SignaturePad from "react-signature-canvas";
import ButtonUI from "../../Button.component";
import styles from "./AddSignaturePop.module.css";

const Signature = (data) => {
  let sigPad = {};

  const trim = () => {
    data.func(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  const clear = () => {
    sigPad.clear();
  };
  return (
    <>
      <div className={styles.SignBox}>
        <SignaturePad backgroundColor='white'
          canvasProps={{ width: 500, height: 200, className: "sigCanvas"}}
          ref={(ref) => {
            sigPad = ref;
          }}
        />
        <button className={styles.resetsignature} onClick={clear}>
          <img src="/images/resetsignature.png" />
        </button>
      </div>
      <div className={styles.btnwrap}>
        <ButtonUI onClick={trim} type={"submit"}>{" "}Continue{" "}</ButtonUI>
      </div>
       
    </>
  );
};

export default Signature;
