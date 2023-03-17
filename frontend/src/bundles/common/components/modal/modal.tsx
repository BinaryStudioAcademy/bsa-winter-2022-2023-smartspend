import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { type ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    Header?: ReactNode;
    Body?: ReactNode;
    children?: ReactNode;
    submitButtonName: string;
};

const BaseModal: React.FC<Properties> = ({
                                             Header,
                                             Body,
                                             onClose,
                                             children,
                                             isShown,
                                             onSubmit,
                                             submitButtonName,
                                         }) => {

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    if(!isShown){
        return null;
    }

    return (
        <>
            <Modal dialogClassName={styles.popup} show={isShown} onHide={onClose} centered size='lg'>
                <button
                    data-test-id="book-trip-popup-close"
                    className={styles.popup__close}
                    onClick={handleClose}
                >×</button>
                <Modal.Header className={styles.modalHeader}>
                    {Header}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    {Body}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    {children}
                    <button className={styles.cancel} onClick={handleClose}>
                        Cancel
                    </button>
                    <button className={styles.green} onClick={onSubmit}>
                        {submitButtonName}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export { BaseModal };
