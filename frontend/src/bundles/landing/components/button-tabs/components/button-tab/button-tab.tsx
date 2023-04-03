import classNames from 'classnames';

import styles from '../../styles.module.scss';

type Properties = {
    label: string;
    isActive: boolean;
    disabled: boolean;
};

const ButtonTab: React.FC<Properties> = ({ label, isActive, disabled }) => {
    const tabClassName = classNames(styles.tab, {
        [styles.activeTab]: isActive,
    });
    return (
        <button disabled={disabled} className={tabClassName}>
            {label}
        </button>
    );
};

export { ButtonTab };
