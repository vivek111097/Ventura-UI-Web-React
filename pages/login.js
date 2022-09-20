import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import { TOGGLE_MODAL } from "../Redux/modal";
import { connect } from "react-redux";
import { useEffect,useState } from "react";
import ButtonUI from "../components/ui/Button.component";
import AddSignature from "../components/ui/Popups/AddSignaturePop/AddSignaturePop.component";
// import UploadPan from "../components/ui/Popups/UploadPan/UploadPan.component";
import Modal from "../components/ui/Modal/Modal.component";

const Home = (props) => {
  const { showModal, toggleModal } = props;
  // useEffect(() => {
  //   axios.get('https://kyc-stage.ventura1.com/onboarding/v1/signup/static/nominee/relationships').then(data => console.log(data))
  // })
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  return (
    <div className={styles.container}>
      <Layout>
        {showModal && <Modal ModalType="signature_modal"  onClick={toggleModal}>
          <AddSignature/>
          {/* <UploadPan/> */}
        </Modal>}
        <ButtonUI onClick={toggleModal}>Toggle Modal</ButtonUI>
      </Layout>

    </div>
  )
}


// map stateToProps and mapDispatchToProps redux method for access store.and connect using reducx connect method
const mapStateToProps = (state) => {
  return {
    showModal: state.modalReducer.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(TOGGLE_MODAL()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
