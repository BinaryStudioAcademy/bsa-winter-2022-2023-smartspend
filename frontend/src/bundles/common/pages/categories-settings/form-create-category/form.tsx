import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import { Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { FaIcons, InputType } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    onClick: (
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>,
    ) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type InputValues = {
    name: string;
};

interface DataType {
    value: any;
    name?: string;
    image?: string;
}

const mock = [{ value: '' }];

const Form: React.FC<Properties> = ({ onClick, handleKeyDown }) => {
    const [selectedIcon, setSelectedIcon] = useState<DataType>(mock[0]);
    const [selectedColorIcon, setSelectedColorIcon] = useState<DataType>(
        mock[0],
    );
    const [selectedType, setSelectedType] = useState<DataType>(mock[0]);
    const {
        control,
        formState: { errors },
        watch,
    } = useForm<InputValues>({
        defaultValues: { name: '' },
    });
    const iconFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.value ? (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{
                            background: `var(${selectedColorIcon.value})`,
                        }}
                    >
                        <FontAwesomeIcon icon={data.value} />
                    </span>
                ) : (
                    <span className={styles.dropdownColorIcon}>
                        <FontAwesomeIcon icon={FaIcons.CLOUD_ARROW_UP} />
                    </span>
                )}
            </div>
        ),
        [selectedColorIcon],
    );
    const iconColorFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.value ? (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{ background: `var(${data.value})` }}
                    ></span>
                ) : (
                    <span className={styles.dropdownColorIcon}>
                        <FontAwesomeIcon icon={FaIcons.STOP} />
                    </span>
                )}
            </div>
        ),
        [],
    );
    const typeFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.name ? (
                    <span className={styles.inputLabel}>{data.name}</span>
                ) : (
                    <span className={styles.inputLabel}>Choose type</span>
                )}
            </div>
        ),
        [],
    );

    return (
        <div>
            <div>
                <span className={styles.title}>Create a new category</span>
            </div>
            <div
                className={styles.form}
                role="button"
                tabIndex={0}
                onClick={onClick}
                onKeyDown={handleKeyDown}
            >
                <form name="categoryNewForm" autoComplete="off">
                    <div className={styles.wrapperSettings}>
                        <div className={styles.wrapperSelect}>
                            <Dropdown
                                data={mock}
                                selectedOption={selectedIcon}
                                label={'Icon'}
                                labelClassName={styles.inputLabel}
                                formatOptionLabel={iconFormatOptionLabel}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <Dropdown
                                data={mock}
                                selectedOption={selectedColorIcon}
                                labelClassName={styles.inputLabel}
                                label={'Color'}
                                formatOptionLabel={iconColorFormatOptionLabel}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Name"
                                name="name"
                                placeholder="New category name"
                                type={InputType.TEXT}
                                isDisabled={false}
                                labelClassName={styles.inputLabelColor}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <Dropdown
                                data={mock}
                                selectedOption={selectedType}
                                labelClassName={styles.inputLabel}
                                label={'Type'}
                                formatOptionLabel={typeFormatOptionLabel}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Form };
