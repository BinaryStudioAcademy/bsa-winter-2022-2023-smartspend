import classNames from 'classnames';
import React, {
    type MouseEventHandler,
    type ReactNode,
    useCallback,
} from 'react';

import { Button, Portal } from '~/bundles/common/components/components.js';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums.js';
import { useEffect } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
    Header?: ReactNode;
    Body: ReactNode;
    children?: ReactNode;
    hasActionButtons?: boolean;
    submitButtonName?: string;
    submitButtonVariant?: ButtonVariant;
    width?: number;
    footerContainerClass?: string;
    buttonsSize?: ButtonSize;
    disabled?: boolean;
};

const BaseModal: React.FC<Properties> = ({
    Header,
    Body,
    onClose,
    children,
    isShown,
    onSubmit,
    hasActionButtons = true,
    submitButtonName,
    submitButtonVariant = ButtonVariant.PRIMARY,
    footerContainerClass = '',
    width,
    buttonsSize = ButtonSize.SMALL,
    disabled,
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
                            className={
                                footerContainerClass
                                    ? classNames(footerContainerClass)
                                    : classNames(styles.modalFooter)
                            }
                        >
                            {children}
                            {hasActionButtons && (
                                <div className={styles.mainButtonsWrapper}>
                                    <Button
                                        variant={ButtonVariant.SECONDARY}
                                        size={buttonsSize}
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant={submitButtonVariant}
                                        size={buttonsSize}
                                        onClick={onSubmit}
                                        disabled={disabled}
                                    >
                                        {submitButtonName}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export { BaseModal };
