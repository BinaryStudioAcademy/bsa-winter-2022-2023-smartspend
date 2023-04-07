import classNames from 'classnames';

import {
    WalletCardSize,
    WalletCardVariant,
} from '~/bundles/common/enums/enums';

import { toCustomLocaleString } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    balance_value: number;
    wallet_type: string;
    currency?: string | undefined;
    variant?: WalletCardVariant;
    size?: WalletCardSize;
};

const WalletCard: React.FC<Properties> = ({
    title,
    balance_value,
    wallet_type,
    currency,
    variant = WalletCardVariant.PRIMARY,
    size = WalletCardSize.BIG,
}) => {
    const cardContainerClass = classNames(
        styles.container,
        styles[variant],
        styles[size],
    );
    return (
        <div className={cardContainerClass}>
            <h1 className={styles.title}>{title}</h1>
            <div>
                <p className={styles.walletType}>{wallet_type}</p>
                <p className={styles.balance}>
                    {toCustomLocaleString(balance_value, currency)}
                </p>
            </div>
        </div>
    );
};

export { WalletCard };
