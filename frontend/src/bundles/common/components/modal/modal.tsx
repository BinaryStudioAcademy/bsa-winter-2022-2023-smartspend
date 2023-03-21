import classNames from 'classnames';
import { type MouseEventHandler, type ReactNode } from 'react';
import React, { useCallback } from 'react';

import { Button } from '~/bundles/common/components/button/button';
import { Portal } from '~/bundles/common/components/portal/portal';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
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
                            <div className={styles.mainButtonsWrapper}>
                                <Button
                                    variant={ButtonVariant.SECONDARY}
                                    size={ButtonSize.SMALL}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={ButtonVariant.PRIMARY}
                                    size={ButtonSize.SMALL}
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
