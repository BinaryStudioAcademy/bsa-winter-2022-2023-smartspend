import './modal.scss';

import { type ReactNode } from 'react';
import React, { useCallback } from 'react';

interface Properties {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    header: ReactNode;
    body: ReactNode;
    children: ReactNode;
}

const Modal: React.FC<Properties> = ({
    header,
    body,
    onClose,
    children,
    active,
    setActive,
}) => {
    const handleClose = useCallback(() => {
        setActive(false);
        onClose();
    }, [setActive, onClose]);

    return (
        <div className={active ? 'modal active' : 'modal'}>
            <div className="popup">
                <button
                    data-test-id="book-trip-popup-close"
                    className="popup__close"
                    onClick={handleClose}
                >
                    ×
                </button>
                <div className="modal-header">{header}</div>
                <div className="modal-body">{body}</div>
                <div className="modal-footer">{children}</div>
            </div>
        </div>
    );
};

export { Modal };
