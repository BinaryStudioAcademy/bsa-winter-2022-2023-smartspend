import classNames from 'classnames';
import {
    type MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { Portal } from '~/bundles/common/components/portal/portal';

import styles from './styles.module.scss';

interface Properties {
    isShown: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const ModalAddWallet: React.FC<Properties> = ({ isShown, onClose }) => {
    const [walletName, setWalletName] = useState('');

    const handleWalletNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setWalletName(event.target.value);
        },
        [],
    );

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
                className={styles.modalBackground}
                onClick={handleClose}
                role="presentation"
            >
                <div
                    className={styles.modal}
                    onClick={handleDisableContentContainerClick}
                    role="presentation"
                >
                    <span className={styles.title}>Create new Wallet</span>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="walletName">
                            Wallet Name
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="walletName"
                            placeholder="Enter your wallet name"
                            onChange={handleWalletNameChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={styles.label}
                            htmlFor="walletCurrency"
                        >
                            Currency
                        </label>

                        {/* Dropdown starts here */}

                        <select id="walletCurrency" required>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="CAD">CAD</option>
                        </select>

                        {/* Dropdown ends here */}
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={styles.label}
                            htmlFor="startingBalance"
                        >
                            Starting balance (optional)
                        </label>
                        <input
                            className={styles.input}
                            type="number"
                            id="startingBalance"
                            placeholder="0.00"
                        />
                    </div>
                    <button
                        className={classNames(
                            walletName && styles.active,
                            styles.button,
                        )}
                        style={{ cursor: walletName ? 'pointer' : 'default' }}
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </div>
        </Portal>
    );
};

export { ModalAddWallet };
