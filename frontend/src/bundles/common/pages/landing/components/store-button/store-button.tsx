import { ButtonVariant } from '../../enums/enums';
import { Button } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    body: string;
    iconPath: string;
    storeAlt: string;
};

const StoreButton: React.FC<Properties> = ({
    title,
    body,
    iconPath,
    storeAlt,
}) => {
    return (
        <Button variant={ButtonVariant.PLAIN} className={styles.store_button}>
            <div className={styles.container}>
                <img src={iconPath} alt={storeAlt} />
                <div className={styles.details_container}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.body}>{body}</p>
                </div>
            </div>
        </Button>
    );
};

export { StoreButton };
