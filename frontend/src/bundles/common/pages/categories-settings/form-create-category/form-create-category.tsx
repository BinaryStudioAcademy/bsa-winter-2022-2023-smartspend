import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import { Button, Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { ButtonSize,ButtonType,ButtonVariant, FaIcons, InputType } from '~/bundles/common/enums/enums';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';

import { categoriesType } from '../common/mock/caregories-type';
import { iconColors } from '../common/mock/icons-color';
import { iconList } from '../common/mock/icons-list';
import styles from './styles.module.scss';

interface FormValues {
    icon: string;
    color: string;
    name: string;
    type: string;
}

interface DataType {
    value: any;
    name?: string;
    image?: string;
}

type InputValues = {
    name: string;
};

type Properties = {
    onClose: () => void;
};

const FormCreateCategory: React.FC<Properties> = ({ onClose }) => {

    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [form, setForm] = useState<FormValues>({
        name: '',
        icon: '',
        color: '',
        type:'',
    });
    const [selectedIcon, setSelectedIcon] = useState<DataType>({ value: form.icon });
    const [selectedColorIcon, setSelectedColorIcon] = useState<DataType>({ value: form.color });
    const [selectedType, setSelectedType] = useState<DataType>({ value: form.type });

    const handleDropdownIconChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const icon = selectedOption.value;
                setForm((previousState) => ({ ...previousState, icon: icon }));
                setSelectedIcon(selectedOption);
            }
        }, []
    );
    const iconFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.value ? (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{ background: `var(${selectedColorIcon.value})` }}
                    >
                        <FontAwesomeIcon icon={data.value} />
                    </span>
                ) : <span
                        className={styles.dropdownColorIcon}
                    >
                        <FontAwesomeIcon icon={FaIcons.CLOUD_ARROW_UP} />
                    </span>
                }
            </div>
        ), [selectedColorIcon]
    );
    const handleDropdownColorChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const colorIcon = selectedOption.value;
                setForm((previousState) => ({ ...previousState, color: colorIcon }));
                setSelectedColorIcon(selectedOption);
            }
        }, []
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
                    <span
                        className={styles.dropdownColorIcon}
                        >
                        <FontAwesomeIcon icon={FaIcons.STOP} />
                    </span>
                )}
            </div>
        ),[]
    );

    const handleDropdownTypeChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const type = selectedOption.value;
                setForm((previousState) => ({ ...previousState, type: type }));
                setSelectedType(selectedOption);
            }
        }, []
    );
    const typeFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.name ? (
                    <span
                        className={styles.inputLabel}
                    >{data.name }</span>
                ) : (
                    <span
                        className={styles.inputLabel}
                    >Choose type</span>
                )}
            </div>
        ),[]
    );
    const { control, formState: { errors }, watch } = useForm<InputValues>({
        defaultValues: { name: '' }
    });
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setForm((previousState) => ({ ...previousState, name: value }));
    }, []);
    useEffect(() => {
        const { name, icon, color, type } = form;
        if (name && icon && color && type) {
            setIsButtonVisible(false);
            return;
        }
        setIsButtonVisible(true);
    }, [form]);
    const handleClick = useCallback(():void => {
        resetForm();
        setIsButtonVisible(true);
        onClose();
    },[]);
    const resetForm = ():void => {
        setForm({ name: '', icon: '', color: '', type: '' });
        setIsButtonVisible(false);
    };
    return (
            <div className={styles.form}>
                <form name="categoryNewForm" autoComplete="off">
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
                        <div className={styles.categoryInput}>
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
                        <div className={styles.wrapperModalBtn}>
                            <Button
                                onClick={handleClick}
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                disabled={isButtonVisible}
                                className={styles.btn}
                            >
                                <FontAwesomeIcon icon={FaIcons.FA_PEN} width='18px'/>
                                <span className={styles.btnName}>Create category</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

export { FormCreateCategory };

