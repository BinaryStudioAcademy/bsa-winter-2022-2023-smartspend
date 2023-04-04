import classNames from 'classnames';

import { variantStyleMap } from '~/bundles/common/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    sum: number | string;
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
