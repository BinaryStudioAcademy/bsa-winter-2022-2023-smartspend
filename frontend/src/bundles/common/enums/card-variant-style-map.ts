import styles from '../components/card-total/styles.module.scss';
import { CardVariant } from './enums.js';

const variantStyleMap: Record<string, string> = {
    [CardVariant.WHITE]: styles.white,
    [CardVariant.ORANGE]: styles.orange,
    [CardVariant.BLUE]: styles.blue,
    [CardVariant.VIOLET]: styles.violet,
};

export { variantStyleMap };
