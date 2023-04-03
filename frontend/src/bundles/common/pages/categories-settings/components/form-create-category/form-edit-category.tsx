import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import {
    Button,
    Dropdown,
    Input,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
    InputType,
} from '~/bundles/common/enums/enums';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';

import { iconColors } from '../mock/icons-color';
import { iconList } from '../mock/icons-list';
import styles from './styles.module.scss';

interface FormValues {
    icon: string;
    color: string;
    name: string;
    type: string;
}

interface DataType {
    value: string;
    name?: string;
    image?: string;
}

type Properties = {
    categoryName: string;
    type: string;
    iconKey: string;
    colorIcon: string;
    onClose: () => void;
};

type InputValues = {
    name: string;
};

const FormEditCategory: React.FC<Properties> = ({
    categoryName,
    type,
    iconKey,
    colorIcon,
    onClose,
}) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [form, setForm] = useState<FormValues>({
        name: categoryName,
        icon: iconKey,
        color: colorIcon,
        type: type,
    });
    const [selectedIcon, setSelectedIcon] = useState<DataType>({
        value: form.icon,
    });
    const [selectedColorIcon, setSelectedColorIcon] = useState<DataType>({
        value: form.color,
    });

    const handleDropdownIconChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const icon = selectedOption.value;
                setForm((previousState) => ({ ...previousState, icon: icon }));
                setSelectedIcon(selectedOption);
            }
        },
        [],
    );
    const iconFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.value && (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{
                            background: `var(${selectedColorIcon.value})`,
                        }}
                    >
                        <FontAwesomeIcon icon={data.value as IconProp} />
                    </span>
                )}
            </div>
        ),
        [selectedColorIcon],
    );
    const handleDropdownColorChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const colorIcon = selectedOption.value;
                setForm((previousState) => ({
                    ...previousState,
                    color: colorIcon,
                }));
                setSelectedColorIcon(selectedOption);
            }
        },
        [],
    );
    const iconColorFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.value && (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{ background: `var(${data.value})` }}
                    ></span>
                )}
            </div>
        ),
        [],
    );
    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setForm((previousState) => ({ ...previousState, name: value }));
        },
        [],
    );
    const {
        control,
        formState: { errors },
    } = useForm<InputValues>({
        defaultValues: { name: '' },
    });
    useEffect(() => {
        const { name, icon, color } = form;
        if (name && icon && color) {
            setIsButtonVisible(false);
            return;
        }
        setIsButtonVisible(true);
    }, [form]);
    const handleClick = useCallback((): void => {
        onClose();
    }, [onClose]);
    return (
        <div className={styles.form}>
            <form name="categoryEditForm" autoComplete="off">
                <div className={styles.wrapperInputs}>
                    <div className={styles.dropdownModal}>
                        <Dropdown
                            data={iconList}
                            selectedOption={selectedIcon}
                            handleChange={handleDropdownIconChange}
                            labelClassName={styles.inputLabel}
                            label={'Icon'}
                            formatOptionLabel={iconFormatOptionLabel}
                        />
                    </div>
                    <div className={styles.dropdownModal}>
                        <Dropdown
                            data={iconColors}
                            selectedOption={selectedColorIcon}
                            handleChange={handleDropdownColorChange}
                            labelClassName={styles.inputLabel}
                            label={'Color'}
                            formatOptionLabel={iconColorFormatOptionLabel}
                        />
                    </div>
                    <div className={styles.categoryInputEdit}>
                        <Input
                            control={control}
                            errors={errors}
                            label="Name"
                            name="name"
                            placeholder="New category name"
                            type={InputType.TEXT}
                            inputClassName={styles.customInput}
                            labelClassName={styles.inputLabelColor}
                            isDisabled={false}
                            onChange={handleInputChange}
                            value={form.name}
                        />
                    </div>
                    <div className={styles.wrapperModalBtn}>
                        <Button
                            onClick={handleClick}
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            disabled={isButtonVisible}
                            className={styles.btn}
                        >
                            <FontAwesomeIcon
                                icon={FaIcons.FA_PEN}
                                width="18px"
                            />
                            <span className={styles.btnName}>
                                Edit category
                            </span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { FormEditCategory };
