import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import classes from './Modal.module.css';

const Overlay: React.FC<{ handleHideModal: () => void }> = ({
    handleHideModal,
}) => {
    return <div className={classes.overlay} onClick={handleHideModal}></div>;
};

const ModalContent: React.FC<{
    children?: React.ReactNode;
    handleHideModal: () => void;
}> = ({ children, handleHideModal }) => {
    return (
        <div className={classes['modal-content__wrapper']}>
            <div className={classes['modal-content']}>
                <div className={classes['cancel-icon__container']}>
                    <FaTimes onClick={handleHideModal} />
                </div>
                {children}
            </div>
        </div>
    );
};

const Modal: React.FC<{
    children?: React.ReactNode;
    handleHideModal: () => void;
}> = ({ children, handleHideModal }) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Overlay handleHideModal={handleHideModal} />,
                document.getElementById('overlay')!
            )}
            {ReactDOM.createPortal(
                <ModalContent handleHideModal={handleHideModal}>
                    {children}
                </ModalContent>,
                document.getElementById('overlay')!
            )}
        </React.Fragment>
    );
};

export default Modal;
