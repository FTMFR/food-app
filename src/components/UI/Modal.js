import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
    return (
        <div className={styles.backdrop} onClick={props.onCloseBtn}>
        </div>
    )
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>

        </div>
    );
};


const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onCloseBtn={props.onCloseBtn} />,
                portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement)}
        </Fragment>

    );
};

export default Modal;
