import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import { Button, Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { ButtonSize,ButtonType,ButtonVariant, FaIcons, InputType } from '~/bundles/common/enums/enums';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import { colors } from '../common/mock/icons-color';
import styles from './styles.module.scss';

interface FormValues {
    icon: string;
    color: string;
    name: string;
    type: string;
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
    const [selectedSingle, setSelectedSingle] = useState<DataType>(colors[0]);

    const handleDropdownIconChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const icon = selectedOption.value;
                setForm((previousState) => ({ ...previousState, icon: icon }));
            }
        }, []);
    const handleDropdownColorChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const colorIcon = selectedOption.value;
                setForm((previousState) => ({ ...previousState, color: colorIcon }));
            }
    },[]);

    const handleDropdownTypeChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                const type = selectedOption.value;
                setForm((previousState) => ({ ...previousState, type: type }));
            }
        }, []);
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
                            <span className={styles.inputLabel}>Icon</span>
                                <Dropdown
                                data={colors}
                                selectedOption={selectedSingle}
                                handleChange={handleDropdownIconChange}
                            />
                        </div>
                        <div className={styles.dropdownModal}>
                            <span className={styles.inputLabel}>Color</span>
                            <Dropdown
                                data={colors}
                                selectedOption={selectedSingle}
                                handleChange={handleDropdownColorChange}
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
                            <span className={styles.inputLabel}>Type</span>
                            <Dropdown
                                data={colors}
                                selectedOption={selectedSingle}
                                handleChange={handleDropdownTypeChange}
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

