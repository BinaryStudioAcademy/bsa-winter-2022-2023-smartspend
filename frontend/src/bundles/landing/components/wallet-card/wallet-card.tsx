import classNames from 'classnames';

import { WalletCardVariant } from '../../enums/enums';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    balance_value: string;
    wallet_type: string;
    variant?: WalletCardVariant;
};

const WalletCard: React.FC<Properties> = ({
    title,
    balance_value,
    wallet_type,
    variant = WalletCardVariant.PRIMARY,
}) => {
    const cardContainerClass = classNames(styles.container, styles[variant]);
    return (
        <div className={cardContainerClass}>
            <h1 className={styles.title}>{title}</h1>
            <div>
                <p className={styles.walletType}>{wallet_type}</p>
                <p className={styles.balance}>{balance_value}</p>
            </div>
        </div>
    );
};

export { WalletCard };
