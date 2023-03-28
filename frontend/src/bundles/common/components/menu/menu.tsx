import { menuLinks } from '~/bundles/common/enums/enums.js';

import { MenuLinks } from '../components';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
    return (
        <nav className={styles.menu}>
            <MenuLinks
                links={menuLinks}
                classNameList={styles.menuList}
                classNameLink={styles.menuLink}
            />
        </nav>
    );
};

export { Menu };
