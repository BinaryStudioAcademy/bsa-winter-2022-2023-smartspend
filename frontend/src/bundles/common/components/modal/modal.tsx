import './modal.scss';

import { type MouseEventHandler, type ReactNode } from 'react';
import React, { useCallback } from 'react';

import { Portal } from '~/bundles/common/components/portal/portal';
import { useEffect } from '~/bundles/common/hooks/hooks';

interface Properties {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    Header: ReactNode;
    Body: ReactNode;
    children?: ReactNode;
}

const Modal: React.FC<Properties> = ({
    Header,
    Body,
    onClose,
    children,
    isShown,
    onSubmit,
}) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);
    const handleDisableContentContainerClick: MouseEventHandler<HTMLDivElement> =
        useCallback((event_) => {
            event_.stopPropagation();
        }, []);

    const handleKeyDown = (event_: KeyboardEvent):void => {
        if (event_.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    if (!isShown) {
        return null;
    }
    return (
        <Portal>
            <div
                className="modal active"
                onClick={handleClose}
                role="presentation"
            >
                <div
                    className="popup"
                    onClick={handleDisableContentContainerClick}
                    role="presentation"
                >
                    <button
                        data-test-id="book-trip-popup-close"
                        className="popup__close"
                        onClick={handleClose}
                    >
                        ×
                    </button>
                    <div className="modal-header">{Header}</div>
                    <div className="modal-body">{Body}</div>
                    <div className="modal-footer">
                        {children}
                        <button className="cancel" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="green" onClick={onSubmit}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export { Modal };
