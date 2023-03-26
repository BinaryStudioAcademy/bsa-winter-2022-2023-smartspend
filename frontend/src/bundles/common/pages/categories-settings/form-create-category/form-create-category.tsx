// import { faEnvelope, faGasPump } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/bundles/common/components/components';
// import { Input } from '~/bundles/common/components/input/input';
import { ButtonSize,ButtonType,ButtonVariant } from '~/bundles/common/enums/enums';
// import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useEffect, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

interface FormValues {
    icon: string;
    color: string;
    name: string;
    type: string;
}

const FormCreateCategory: React.FC = () => {

    const [isFormActive, setIsFormActive] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [form, setForm] = useState<FormValues>({
        name: '',
        icon: '',
        color: '',
        type:'',
    });

    useEffect(() => {
        const { name, icon, color, type } = form;
        if (name && icon && color && type) {
            setIsButtonVisible(false);
            return;
        }
        setIsButtonVisible(true);
    }, [form]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setForm((previousState) => ({ ...previousState, [name]: value }));
    }, []);

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
                <span>Create a new category</span>
            </div>
            {/* <button></button> //mobile */}
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
                                            <label htmlFor="icon">Icon</label>
                                            <select name="icon" id="icon"
                                                value={form.icon}
                                                onChange={handleInputChange}
                                                onFocus={handleFocus}
                                            >
                                                <option value=""></option>
                                                <option value="icon1">icon1</option>
                                                <option value="icon2">icon2</option>
                                            </select>
                                        </div>
                                        <div className={styles.selectIconColor}>
                                            <label htmlFor="color">Color</label>
                                            <select name="color" id="color"
                                                value={form.color}
                                                onChange={handleInputChange}
                                                onFocus={handleFocus}
                                            >
                                                <option value=""></option>
                                                <option value="red">red</option>
                                                <option value="green">green</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.categoryName}>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            value={form.name}
                                            id='name'
                                            name="name"
                                            type="text"
                                            placeholder="New category name"
                                            className={`${styles.customInput} ${styles.inputLabel} ${styles.label}`}
                                        />
                                        {/* <Input
                                            control={control}
                                            errors={errors}
                                            label="Name"
                                            name="note"
                                            placeholder="New category name"
                                            type={InputType.TEXT}
                                            className={`${styles.customInput} ${styles.inputLabel} ${styles.label}`}
                                            isDisabled={false}
                                            eyeHidden={false}
                                        /> */}
                                    </div>
                                    <div className={styles.wrapperType}>
                                        <div className={styles.selectType}>
                                            <label htmlFor="type">Type</label>
                                            <select name="type" id="type"
                                                value={form.type}
                                                onChange={handleInputChange}
                                                onFocus={handleFocus}
                                            >
                                                <option value="expense">expense</option>
                                                <option value="income">income</option>
                                            </select>
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

