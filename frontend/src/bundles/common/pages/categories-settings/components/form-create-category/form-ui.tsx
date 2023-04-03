import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaIcons } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    onClick: (
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>,
    ) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

const FormUi: React.FC<Properties> = ({ onClick, handleKeyDown }) => {
    return (
        <div
            className={styles.wrapperSettings}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <form name="category" autoComplete="off">
                <div className={styles.wrapperSettings}>
                    <div className={styles.wrapperSelect}>
                        <span className={styles.inputLabel}>Icon</span>
                        <div className={styles.dropdown}>
                            <span className={styles.dropdownColorIcon}>
                                <FontAwesomeIcon
                                    icon={FaIcons.CLOUD_ARROW_UP}
                                />
                            </span>
                            <span className={styles.dropdownArrowIcon}>
                                <FontAwesomeIcon icon={FaIcons.CHEVRON_DOWN} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.wrapperSelect}>
                        <span className={styles.inputLabel}>Color</span>
                        <div className={styles.dropdown}>
                            <span className={styles.dropdownColorIcon}>
                                <FontAwesomeIcon icon={FaIcons.STOP} />
                            </span>
                            <span className={styles.dropdownArrowIcon}>
                                <FontAwesomeIcon icon={FaIcons.CHEVRON_DOWN} />
                            </span>
                        </div>
                    </div>
                    <div className={styles.wrapperSelect}>
                        <span className={styles.inputLabel}>Name</span>
                        <div className={styles.dropdown}>
                            <span className={styles.inputLabel}>
                                New category name
                            </span>
                        </div>
                    </div>
                    <div className={styles.wrapperSelect}>
                        <span className={styles.inputLabel}>Type</span>
                        <div className={styles.dropdown}>
                            <span className={styles.inputLabel}>
                                Choose type
                            </span>
                            <span className={styles.dropdownArrowIcon}>
                                <FontAwesomeIcon icon={FaIcons.CHEVRON_DOWN} />
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { FormUi };
