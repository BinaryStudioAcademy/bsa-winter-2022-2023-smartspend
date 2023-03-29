// import { faEnvelope, faGasPump } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

import { Button, Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { ButtonSize,ButtonType,ButtonVariant, InputType } from '~/bundles/common/enums/enums';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import { colors } from '../common/icons-color';
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

const FormCreateCategory: React.FC = () => {

    const [isFormActive, setIsFormActive] = useState(false);
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
    
    const inputValue = watch('name');

    useEffect(()=> {
        setForm((previousState) => ({ ...previousState, name: inputValue }));
    }, [inputValue]);
    
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
    },[]);

    const handleFocus = useCallback(() => {
        if (isFormActive) {
            return;
        }
        setIsFormActive(!isFormActive);
    }, [isFormActive]);

    const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement>):void => {
        if (event.currentTarget === event.target ) {
            setIsFormActive(false);   
            resetForm();
        }
    }, [setIsFormActive]);

    const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === 'Escape') {
            setIsFormActive(false);   
            resetForm();
        }
    },[]);
    
    const resetForm = ():void => {
        setForm({ name: '', icon: '', color: '', type: '' });
        setIsButtonVisible(false);
    };
    
    return (
        <div>
            <div>
                <span className={styles.title}>Create a new category</span>
            </div>
            <div>
                <div className={`${styles.overlay} ${isFormActive ? styles.active : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    onClick={handleBackdropClick}
                ></div>
                <div className={`${ isFormActive ? styles.formActive : styles.formWrapper }`}>
                    <div className={styles.form} tabIndex={0} role="button"
                    onKeyDown={onKeyDown}>
                        <form name="categoryNewForm" autoComplete="off">
                            <div className={styles.nameTree}>
                                <div className={styles.nameFour}>
                                    <div className={styles.wrapperIconSettings}>
                                        <div className={styles.selectIcon}>
                                            <span className={styles.inputLabel}>Icon</span>
                                             <Dropdown
                                                data={colors}
                                                selectedOption={selectedSingle}
                                                handleChange={handleDropdownIconChange}
                                                width="100%"
                                                handleFocus={handleFocus}
                                            />
                                        </div>
                                        <div className={styles.selectIconColor}>
                                            <span className={styles.inputLabel}>Color</span>
                                            <Dropdown
                                                data={colors}
                                                selectedOption={selectedSingle}
                                                handleChange={handleDropdownColorChange}
                                                width="100%"
                                                handleFocus={handleFocus}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.categoryName}>
                                        <Input
                                            control={control}
                                            errors={errors}
                                            label="Name"
                                            name="name"
                                            placeholder="New category name"
                                            type={InputType.TEXT}
                                            inputClassName={styles.customInput}
                                            labelClassName={styles.inputLabel}
                                            isDisabled={false}
                                            // onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            value={form.name} 
                                        />
                                    </div>
                                    <div className={styles.wrapperType}>
                                        <div className={styles.selectType}>
                                            <span className={styles.inputLabel}>Type</span>
                                            <Dropdown
                                                data={colors}
                                                selectedOption={selectedSingle}
                                                handleChange={handleDropdownTypeChange}
                                                width="100%"
                                                handleFocus={handleFocus}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.wrapperBtn}>
                                        {isFormActive && (<Button
                                            onClick={handleClick}
                                            type={ButtonType.BUTTON}
                                            variant={ButtonVariant.PRIMARY}
                                            size={ButtonSize.MEDIUM}
                                            disabled={isButtonVisible}
                                            className={styles.btn}
                                        >
                                            <span className={styles.btnName}>Create category</span>
                                        </Button>)}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { FormCreateCategory };

