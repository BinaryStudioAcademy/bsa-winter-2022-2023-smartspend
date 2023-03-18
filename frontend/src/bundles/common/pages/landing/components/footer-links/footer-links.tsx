import { type ValueOf } from 'shared/build';

import { type AppRoute } from '../../enums/enums';
import { Link } from '../components';
import styles from './styles.module.scss';

type Properties = {
    links: {
        to: ValueOf<typeof AppRoute>;
        value: string;
    }[]
};

const FooterLinks: React.FC<Properties> = ({ links }) => {
    return (
        <div className={styles.links}>
            {links.map((link, index) => (
                <li key={index}>
                    <Link to={link.to}>{link.value}</Link>
                </li>
            ))}
        </div>
    );
};

export { FooterLinks };
