import classNames from 'classnames';

import { toCustomLocaleString } from '~/bundles/common/helpers/helpers';

import { InfoCardTypes } from '../../enums/enums';
import styles from './styles.module.scss';

interface InfoCardProperties {
    type: InfoCardTypes;
    total: number;
    currency: string;
}

const InfoCard: React.FC<InfoCardProperties> = ({ type, total, currency }) => {
    let title;
    switch (type) {
        case InfoCardTypes.ORIGINALLY: {
            title = 'Originally Budgeted';
            break;
        }
        case InfoCardTypes.SPENT: {
            title = 'Spent so far';
            break;
        }
        case InfoCardTypes.LEFT: {
            title = 'Money left';
            break;
        }
        case InfoCardTypes.CAN: {
            title = 'You can spend';
            break;
        }
        default: {
            title = '';
        }
    }

    const spent =
        type === InfoCardTypes.SPENT
            ? toCustomLocaleString(total, currency, true).replace('+', '-')
            : toCustomLocaleString(total, currency, true);

    return (
        <div className={classNames(styles.card, `${styles['card' + type]}`)}>
            <span className={styles.title}>{title}</span>
            <span
                className={classNames(
                    styles.total,
                    type === InfoCardTypes.SPENT ? styles.minus : '',
                )}
            >
                {spent}
                {type === InfoCardTypes.CAN ? '/Day' : ''}
            </span>
        </div>
    );
};

export { InfoCard };
