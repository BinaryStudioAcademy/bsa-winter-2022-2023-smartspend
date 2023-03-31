import classNames from 'classnames';
import { type MouseEventHandler, type ReactNode } from 'react';
import React, { useCallback } from 'react';

import { Button, Portal } from '~/bundles/common/components/components.js';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums.js';
import { useEffect } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    Header: ReactNode;
    Body: ReactNode;
    children?: ReactNode;
    submitButtonName: string;
    width?: number;
    footerContainerClass?: string;
    buttonsSize?: ButtonSize;
};

const BaseModal: React.FC<Properties> = ({
    Header,
    Body,
    onClose,
    children,
    isShown,
    onSubmit,
    submitButtonName,
    footerContainerClass = '',
    width,
    buttonsSize = ButtonSize.SMALL,
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
        if (isShown) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
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
                <div className={styles.modalDialog}>
                    <div
                        className={styles.popup}
                        onClick={handleDisableContentContainerClick}
                        role="presentation"
                        style={{ width: `${width}px` }}
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
                        <div
                            className={classNames(
                                styles.modalFooter,
                                footerContainerClass,
                            )}
                        >
                            {children}
                            <div className={styles.mainButtonsWrapper}>
                                <Button
                                    variant={ButtonVariant.SECONDARY}
                                    size={buttonsSize}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={ButtonVariant.PRIMARY}
                                    size={buttonsSize}
                                    onClick={onSubmit}
                                >
                                    {submitButtonName}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export { BaseModal };
