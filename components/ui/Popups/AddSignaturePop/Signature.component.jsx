import React,{useState} from "react";
import SignaturePad from "react-signature-canvas";
import ButtonUI from "../../Button.component";
import styles from "./AddSignaturePop.module.css";

const Signature = () => {
  let sigPad = {};
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };
  const clear = () => {
    sigPad.clear();
  };
  return (
    <>
      <div className={styles.SignBox}>
        <SignaturePad
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          ref={(ref) => {
            sigPad = ref;
          }}
        />

        <button className={styles.resetsignature} onClick={clear}>
          <img src="/images/resetsignature.png" />
        </button>
      </div>
      <div className={styles.btnwrap}>
        <ButtonUI onClick={trim} type={"submit"}>
          {" "}
          Continue{" "}
        </ButtonUI>
      </div>
      {trimmedDataURL ? <img src={trimmedDataURL} alt="Signature" /> : null}
    </>
  );
};

export default Signature;
