import { faEnvelope, faGasPump } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

const FormCreateCategory: React.FC = () => {
    return (
        <fieldset>
            <legend>
                <span>Create a new category</span>
            </legend>
            {/* <button></button> //mobile */}
            <div>
                <div className={styles.overlay}></div>
                <div className={styles.nameOne}>
                    <div className={styles.nameTwo}>
                        <form name="categoryNewForm" autoComplete="off">
                            <div className={styles.nameTree}>
                                <div className={styles.nameFour}>
                                    <div
                                        className={`${styles.customIcon} ${styles.mob}`}
                                    >
                                        <div className={styles.selectIcon}>
                                            <label htmlFor="icon">Icon</label>
                                            <select name="icon" id="icon">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faGasPump}
                                                />
                                            </select>
                                        </div>
                                        <div className={styles.selectColorIcon}>
                                            <label htmlFor="colorIcon">
                                                Color
                                            </label>
                                            <select
                                                name="colorIcon"
                                                id="colorIcon"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faGasPump}
                                                />
                                            </select>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.categoryName} ${styles.mob}`}
                                    >
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="New name category"
                                        />
                                    </div>
                                    <div
                                        className={`${styles.selectType} ${styles.mob}`}
                                    ></div>
                                    <div
                                        className={`${styles.createCategoryBtn} ${styles.mob}`}
                                    ></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export { FormCreateCategory };
