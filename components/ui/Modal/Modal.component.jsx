import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const { hideBackdrop } = props;
  return <div className={classes.backdrop} onClick={hideBackdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${classes.modal} ${classes.modalSm}`}>
      <div className="close">Close</div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const {onClick } = props;
  let portalElement;
  const [pageMounted, setPageMounted] = useState(false);
  useEffect(() => {
    setPageMounted(true)
    portalElement = document.querySelector("#modal_overlays");
    return () => setPageMounted(false)
  }, [])


  return (
    <>
       {pageMounted && createPortal(
        <Backdrop hideBackdrop={onClick} />,
        document.querySelector("#modal_overlays")
      )}
      {pageMounted && createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.querySelector("#modal_overlays")
      )}
    </>
  );
};

export default Modal;
