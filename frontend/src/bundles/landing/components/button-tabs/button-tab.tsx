import classNames from 'classnames';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    isActive: boolean;
    disabled: boolean;
};

const ButtonTab: React.FC<Properties> = ({ title, isActive, disabled }) => {
    const tabClassName = classNames(styles.tab, {
        [styles.active]: isActive,
        [styles.disabled]: disabled,
    });
    return (
        <button disabled={disabled} className={tabClassName}>
            {title}
        </button>
    );
};

export { ButtonTab };
