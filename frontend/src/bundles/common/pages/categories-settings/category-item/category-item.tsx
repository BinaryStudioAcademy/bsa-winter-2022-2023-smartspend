import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';

import { findIcon } from '~/bundles/common/helpers/find-icon';

import { Checkbox } from '../common/checkbox/checkbox';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    categoryName: string;
    count: string | number;
    iconKey: string;
    colorIcon: string;
    // setCheckedItem: string[];
};

const CategoryItem: React.FC<Properties> = ({
    id,
    categoryName,
    count,
    iconKey,
    colorIcon,
    // setCheckedItem,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const icon = findIcon(iconKey);

    const handleCheckboxChange = useCallback((isChecked: boolean): void => {
        setIsChecked(isChecked);
        // if (isChecked) {
        //     setCheckedItem((prev: string[]) => [...prev, id])
        // } else {
        //     setCheckedItem((prev: string[]) => prev.filter((item: string) => item !== id));
        // }
    }, []);

    // const handelClickSettings = useCallback((id: string): void => {
        // console.log(id);
    // }, []);
    const handelClickSettings = useCallback(() => {
        // console.log(id);
    }, []);

    const handelClickDelete = useCallback(()=> {
        // console.log(id);
    }, []);

    // const handelClickDelete = useCallback((id: string): void => {
        // console.log(id);
    // }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <div className={`${styles.base} ${styles.checkbox}`}>
                            <Checkbox
                                id={id}
                                label=""
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div
                            className={`${styles.base} ${styles.Wrapper} ${styles.iconCategory}`}
                        >
                            <span
                                className={styles.icon}
                                style={{ backgroundColor: colorIcon }}
                            >
                                {icon}
                            </span>
                        </div>
                        <div
                            className={`${styles.base} ${styles.contentWrapper}`}
                        >
                            <div className={styles.content}>
                                <div className={styles.name}>
                                    <span className={styles.text}>
                                        {categoryName}
                                    </span>
                                </div>
                                <div className={styles.count}>
                                    <span className={styles.text}>
                                        {count} operation
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${styles.base} ${styles.iconWrapper}`}
                        ></div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <button
                                type="button"
                                className={styles.iconBtn}
                                // onClick={():void => handelClickSettings(id)}
                                onClick={handelClickSettings}
                            >
                                <FontAwesomeIcon icon={faGear} />
                            </button>
                        </div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <button
                                type="button"
                                className={`${styles.iconBtn} ${styles.iconBtnDelete}`}
                                // onClick={():void=> handelClickDelete(id)}
                                onClick={handelClickDelete}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
        </div>
    );
};

export { CategoryItem };
