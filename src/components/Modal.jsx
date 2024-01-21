
import styles from '../assets/styles/modal.module.scss'
import PropTypes from 'prop-types';
const Modal = ({ isOpen, handleClose, ...props }) => {
  return (
    <>
      <div className={`${styles.modalWrapper} ${isOpen ? styles.modalOpen : ''}`} onClick={handleClose}>
        <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </>
  )
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  // Add other prop types as needed
};

export default Modal
