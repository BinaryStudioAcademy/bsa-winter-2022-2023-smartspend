import { Button } from '~/bundles/common/components/components.js';
import { ButtonVariant } from '~/bundles/common/enums/enums.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    body: string;
    iconPath: string;
    storeAlt: string;
    url: string;
};

const StoreButton: React.FC<Properties> = ({
    title,
    body,
    iconPath,
    storeAlt,
    url,
}) => {
    const onClick = useCallback(() => {
        window.open(url, '_blank');
    }, [url]);

    return (
        <Button
            variant={ButtonVariant.PLAIN}
            onClick={onClick}
            className={styles.button}
        >
            <div className={styles.container}>
                <img src={iconPath} alt={storeAlt} />
                <div className={styles.detailsContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.body}>{body}</p>
                </div>
            </div>
        </Button>
    );
};

export { StoreButton };
