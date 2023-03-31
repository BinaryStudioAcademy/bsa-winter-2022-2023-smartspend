import { ButtonVariant } from '../../enums/enums';
import { Button } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children: JSX.Element | string;
    isButton?: boolean;
};

const WalletButton: React.FC<Properties> = ({ children, isButton = true }) => {
    return (
        <div className={styles.button}>
            {isButton && (
                <Button variant={ButtonVariant.PLAIN}>
                    <div className={styles.icon}>+</div>
                </Button>
            )}
            <div className={styles.buttonTitle}>{children}</div>
        </div>
    );
};

export { WalletButton };
