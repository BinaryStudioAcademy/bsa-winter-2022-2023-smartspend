import { menuLinks } from '../../enums/enums';
import { useCallback, useState } from '../../hooks/hooks';
import { MenuLinks } from '../components';
import styles from './styles.module.scss';

const MenuBurger: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <div>
            <button onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <MenuLinks
                links={menuLinks}
                classNameList={isOpen ? styles.burgerList : ''}
                classNameLink={styles.burgerLink}
            />
        </div>
    );
};

export { MenuBurger };
