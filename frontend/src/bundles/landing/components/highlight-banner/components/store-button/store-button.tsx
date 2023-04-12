import { Button } from '~/bundles/common/components/components.js';
import { ButtonVariant } from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    iconPath: string;
    storeAlt: string;
};

const StoreButton: React.FC<Properties> = ({ iconPath, storeAlt }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    useEffect(() => {
        const handleEvent = (event_: Event): void => {
            event_.preventDefault();
            setDeferredPrompt(event_);
        };

        window.addEventListener('beforeinstallprompt', handleEvent);

        return (): void => {
            window.removeEventListener('beforeinstallprompt', handleEvent);
        };
    }, []);

    const onClick = useCallback(
        (event_: { preventDefault: () => void }) => {
            event_.preventDefault();
            if (!deferredPrompt) {
                return;
            }
            void (deferredPrompt as BeforeInstallPromptEvent).prompt();
        },
        [deferredPrompt],
    );

    return (
        <Button
            variant={ButtonVariant.PLAIN}
            onClick={onClick}
            className={styles.button}
        >
            <div className={styles.container}>
                <img
                    width="180px"
                    height="70px"
                    src={iconPath}
                    alt={storeAlt}
                />
            </div>
        </Button>
    );
};

export { StoreButton };
