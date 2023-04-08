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
    IconSize,
    InputType,
} from '~/bundles/common/enums/enums';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';

import { DropdownItem } from '../dropdown-item/dropdown-item';
import { categoriesType } from '../mock-for-dropdown/caregories-type';
import { iconColors } from '../mock-for-dropdown/icons-color';
import { iconList } from '../mock-for-dropdown/icons-list';
import styles from './styles.module.scss';

interface FormValues {
    icon?: string;
    color?: string;
    name?: string;
    type?: string;
}

type DataType = {
    value: string;
    name?: string;
    image?: string;
};

type Properties = {
    id?: string;
    name?: string;
    type?: string;
    icon?: string;
    color?: string;
    onClose: () => void;
    isCreateModalShown: boolean;
};

type InputValues = {
    name: string;
};

const FormEditCategory: React.FC<Properties> = ({
    name,
    type,
    icon,
    color,
    onClose,
    isCreateModalShown,
}) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [formData, setFormData] = useState<FormValues>({
        name: name,
        icon: icon,
        color: color,
        type: type,
    });
    const [selectedIcon, setSelectedIcon] = useState<DataType>({
        value: formData.icon ?? '',
    });
    const [selectedColorIcon, setSelectedColorIcon] = useState<DataType>({
        value: formData.color ?? '',
    });
    const [selectedType, setSelectedType] = useState<DataType>({
        value: formData.type ?? '',
    });

    const handleDropdownIconChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const icon = selectedOption.value;
                setFormData((previousState) => ({
                    ...previousState,
                    icon: icon,
                }));
                setSelectedIcon(selectedOption);
            }
        },
        [],
    );
    const iconFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <DropdownItem selectedColorIcon={selectedColorIcon} data={data} />
        ),
        [selectedColorIcon],
    );
    const handleDropdownColorChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const colorIcon = selectedOption.value;
                setFormData((previousState) => ({
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
    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setFormData((previousState) => ({ ...previousState, name: value }));
        },
        [],
    );
    const handleDropdownTypeChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const type = selectedOption.value;
                setFormData((previousState) => ({
                    ...previousState,
                    type: type,
                }));
                setSelectedType(selectedOption);
            }
        },
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
    const {
        control,
        formState: { errors },
    } = useForm<InputValues>({
        defaultValues: { name: '' },
    });
    useEffect(() => {
        const { name, icon, color, type } = formData;
        if (isCreateModalShown && name && icon && color && type) {
            setIsButtonVisible(false);
            return;
        }
        if (!isCreateModalShown && name && icon && color) {
            setIsButtonVisible(false);
            return;
        }
        setIsButtonVisible(true);
    }, [formData, isCreateModalShown]);
    const handleClick = useCallback((): void => {
        onClose();
    }, [onClose]);
    const buttonName = isCreateModalShown ? 'Create category' : 'Edit category';
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
                            value={formData.name}
                        />
                    </div>
                    {isCreateModalShown && (
                        <div className={styles.dropdownModal}>
                            <Dropdown
                                data={categoriesType}
                                selectedOption={selectedType}
                                handleChange={handleDropdownTypeChange}
                                labelClassName={styles.inputLabel}
                                label={'Type'}
                                formatOptionLabel={typeFormatOptionLabel}
                            />
                        </div>
                    )}
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
                                width={IconSize.EIGHTEEN}
                            />
                            <span className={styles.btnName}>{buttonName}</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { FormEditCategory };
