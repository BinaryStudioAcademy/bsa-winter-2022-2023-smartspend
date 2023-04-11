import { Icon } from '~/bundles/common/components/components';
import { FaIcons } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    onClick: (
        event:
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>,
    ) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

const FormUiStub: React.FC<Properties> = ({ onClick, handleKeyDown }) => {
    return (
        <button
            className={styles.wrapperSettings}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.wrapperSettings}>
                <div className={styles.wrapperSelect}>
                    <span className={styles.inputLabel}>Icon</span>
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownColorIcon}>
                            <Icon name={FaIcons.CLOUD_ARROW_UP} />
                        </span>
                        <span className={styles.dropdownArrowIcon}>
                            <Icon name={FaIcons.CHEVRON_DOWN} />
                        </span>
                    </div>
                </div>
                <div className={styles.wrapperSelect}>
                    <span className={styles.inputLabel}>Color</span>
                    <div className={styles.dropdown}>
                        <span className={styles.dropdownColorIcon}>
                            <Icon name={FaIcons.STOP} />
                        </span>
                        <span className={styles.dropdownArrowIcon}>
                            <Icon name={FaIcons.CHEVRON_DOWN} />
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
                        <span className={styles.inputLabel}>Choose type</span>
                        <span className={styles.dropdownArrowIcon}>
                            <Icon name={FaIcons.CHEVRON_DOWN} />
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
};

export { FormUiStub };
