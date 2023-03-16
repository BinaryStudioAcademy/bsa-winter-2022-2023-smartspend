import classNames from 'classnames';

import { variantStyleMap } from '../../enums/enums';
import styles from './card-total.module.scss';

type Properties = {
    title: string;
    sum: number;
    variant: string;
};

const CardTotal: React.FC<Properties> = ({ title, sum, variant }) => {
    return (
        <div className={classNames(styles.card, variantStyleMap[variant])}>
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.sum}>{sum < 0 ? sum : `+${sum}`}$</p>
            </div>
        </div>
    );
};

export { CardTotal };
