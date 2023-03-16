import classNames from 'classnames';
import { type MouseEventHandler, type ReactNode } from 'react';
import React, { useCallback } from 'react';

import { Portal } from '~/bundles/common/components/portal/portal';
import { useEffect } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    Header: ReactNode;
    Body: ReactNode;
    children?: ReactNode;
    submitButtonName: string;
};

const Modal: React.FC<Properties> = ({
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
    const handleDisableContentContainerClick: MouseEventHandler<HTMLDivElement> =
        useCallback((event_) => {
            event_.stopPropagation();
        }, []);

    const handleKeyDown = (event_: KeyboardEvent): void => {
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
                className={classNames(styles.modal, styles.active)}
                onClick={handleClose}
                role="presentation"
            >
                <div
                    className={styles.popup}
                    onClick={handleDisableContentContainerClick}
                    role="presentation"
                >
                    <button
                        data-test-id="book-trip-popup-close"
                        className={styles.popup__close}
                        onClick={handleClose}
                    >
                        ×
                    </button>
                    <div className={styles.modalHeader}>{Header}</div>
                    <div className={styles.modalBody}>{Body}</div>
                    <div className={styles.modalFooter}>
                        {children}
                        <button className={styles.cancel} onClick={handleClose}>
                            Cancel
                        </button>
                        <button className={styles.green} onClick={onSubmit}>
                            {submitButtonName}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export { Modal };
