import React, { type ReactNode } from 'react';

import styles from '~/bundles/auth/components/sign-up-form/styles.module.scss';
import { Button } from '~/bundles/common/components/button/button';
import { BaseModal } from '~/bundles/common/components/modal/modal';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';
import { storage, StorageKey } from '~/framework/storage/storage';

const UseAppPwaHook = (token: string | null): ReactNode => {
    const [isShown, setShown] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    const onModalClose = useCallback(() => {
        void storage.set(StorageKey.PWA, 'false');
        setShown(false);
    }, []);

    const handleEvent = (event_: Event): void => {
        event_.preventDefault();
        setDeferredPrompt(event_);
        setShown(true);
    };

    const onModalSubmit = useCallback(() => {
        void storage.set(StorageKey.PWA, 'false');
        setShown(false);
        if (!deferredPrompt) {
            return;
        }
        window.removeEventListener('beforeinstallprompt', handleEvent);
        void (deferredPrompt as BeforeInstallPromptEvent).prompt();
    }, [deferredPrompt]);

    useEffect(() => {
        const showPWA = storage.getSync(StorageKey.PWA);
        if (token && !showPWA) {
            window.addEventListener('beforeinstallprompt', handleEvent);

            return (): void => {
                window.removeEventListener('beforeinstallprompt', handleEvent);
            };
        }
    }, [token]);

    return (
        <BaseModal
            isShown={isShown}
            Header={<h1 className={styles.modalTitle}>Install the app</h1>}
            Body={
                <div className={styles.modalDetailsContainer}>
                    <p className={styles.modalDetails}>
                        Do you want to install our app on your device?
                    </p>
                </div>
            }
            submitButtonName={'Yes'}
            onClose={onModalClose}
            onSubmit={onModalSubmit}
            width={450}
            buttonsSize={ButtonSize.MEDIUM}
            hasActionButtons={false}
        >
            <div className={styles.modalFooter}>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    onClick={onModalClose}
                >
                    No
                </Button>
                <Button variant={ButtonVariant.PRIMARY} onClick={onModalSubmit}>
                    Yes
                </Button>
            </div>
        </BaseModal>
    );
};

export { UseAppPwaHook };
