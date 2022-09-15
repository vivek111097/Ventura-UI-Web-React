import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import Modal from "../components/ui/Modal/Modal.component";
import { TOGGLE_MODAL } from "../Redux/modal";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import ButtonUI from "../components/ui/Button.component";


const Home = (props) => {
  const { showModal, toggleModal } = props;
  useEffect(() => {
    axios.get('https://kyc-stage.ventura1.com/onboarding/v1/signup/static/nominee/relationships').then(data => console.log(data))
  })
  return (
    <div className={styles.container}>
      <ButtonUI buttonType="success">Success Example</ButtonUI>
      <ButtonUI buttonType="error">Error Example</ButtonUI>
      <ButtonUI><img src="/images/google.png"/>Continue with Google</ButtonUI>
      {/* <Layout>
        {showModal && <Modal onClick={toggleModal}>
          <ButtonUI onClick={toggleModal}>Close</ButtonUI>
          <h1>Smart</h1>
          <div>conflict</div>
        </Modal>}
        <ButtonUI onClick={toggleModal}>Toggle Modal</ButtonUI>
      </Layout> */}
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
