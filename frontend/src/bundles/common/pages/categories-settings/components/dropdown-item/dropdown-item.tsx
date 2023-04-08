import { type IconProp } from '@fortawesome/fontawesome-svg-core';

import { Icon } from '~/bundles/common/components/components';
import { FaIcons } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type DataType = {
    value: string;
    name?: string;
    image?: string;
};

type DataTypeOptionLabel = {
    value: string;
    name?: string;
    image?: string;
};

type TypeProperties = {
    selectedColorIcon: DataType;
    data: DataTypeOptionLabel;
};

const DropdownItem = ({
    selectedColorIcon,
    data,
}: TypeProperties): JSX.Element => {
    return (
        <div className={styles.item}>
            {data.value ? (
                <span
                    className={styles.dropdownColorIcon}
                    style={{
                        background: `var(${selectedColorIcon.value})`,
                    }}
                >
                    <Icon name={data.value as IconProp} />
                </span>
            ) : (
                <span className={styles.dropdownColorIcon}>
                    <Icon name={FaIcons.CLOUD_ARROW_UP} />
                </span>
            )}
        </div>
    );
};

export { DropdownItem };
