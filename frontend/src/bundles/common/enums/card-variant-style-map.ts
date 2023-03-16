import styles from '../components/card-total/card-total.module.scss';
import { CardVariant } from './enums';

const variantStyleMap: Record<string, string> = {
    [CardVariant.WHITE]: styles.white,
    [CardVariant.ORANGE]: styles.orange,
    [CardVariant.BLUE]: styles.blue,
    [CardVariant.VIOLET]: styles.violet,
};

export { variantStyleMap };

