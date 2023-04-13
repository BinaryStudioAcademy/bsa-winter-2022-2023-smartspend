import classNames from 'classnames';

import { variantStyleMap } from '~/bundles/common/enums/enums.js';
import { toCustomLocaleString } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    sum: number;
    variant: string;
    currency?: string | undefined;
};

const CardTotal: React.FC<Properties> = ({ title, sum, variant, currency }) => {
    return (
        <div className={classNames(styles.card, variantStyleMap[variant])}>
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.sum}>
                    {title === 'Total Period Expenses' &&
                        toCustomLocaleString(sum, currency).replace('+', '-')}
                    {title != 'Total Period Expenses' &&
                        toCustomLocaleString(sum, currency)}
                    {title === 'You can spend' && '/Day'}
                </p>
            </div>
        </div>
    );
};

export { CardTotal };
