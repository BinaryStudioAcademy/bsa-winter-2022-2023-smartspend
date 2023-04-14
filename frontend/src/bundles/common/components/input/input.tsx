import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { FaIcons, InputType } from '~/bundles/common/enums/enums.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    placeholder?: string;
    name: FieldPath<T>;
    type?: InputType;
    inputClassName?: string;
    labelClassName?: string;
    isDisabled?: boolean;
    eyeHidden?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    maxLength?: number;
    minLength?: number;
    max?: number;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder = '',
    type,
    inputClassName = '',
    labelClassName = '',
    isDisabled = false,
    eyeHidden = false,
    onChange,
    value,
    maxLength,
    minLength,
    max,
}: Properties<T>): JSX.Element => {
    const [passwordShown, setPasswordShown] = useState(false);
    const { field } = useFormController({ name, control });

    const togglePasswordVisibility = useCallback(() => {
        setPasswordShown((previousState) => !previousState);
    }, []);

    const handleClickEye = useCallback(() => {
        togglePasswordVisibility();
    }, [togglePasswordVisibility]);

    const show = passwordShown ? FaIcons.EYE : FaIcons.EYE_SLASH;

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>): void => {
            if (event.key === 'Enter') {
                handleClickEye();
            }
        },
        [handleClickEye],
    );

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    const labelClasses = classNames(styles.label, labelClassName);
    const inputClasses = classNames(
        styles.input,
        styles[isDisabled ? 'disabled' : ''],
        inputClassName,
    );

    let checkTypePassword;
    if (type !== InputType.CHECKBOX && type !== InputType.NUMBER) {
        checkTypePassword =
            passwordShown || (!field.value && InputType.PASSWORD);
    }
    const inputClassesWithError = classNames(inputClasses, styles.hasError);

    return (
        <label className={labelClasses}>
            <span className={styles.inputLabel}>{label}</span>
            {onChange && (
                <input
                    {...field}
                    type={checkTypePassword ? InputType.TEXT : type}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    className={`${
                        hasError ? inputClassesWithError : inputClasses
                    }`}
                    onChange={onChange}
                    value={value}
                    maxLength={maxLength}
                    minLength={minLength}
                    max={max}
                />
            )}
            {!onChange && (
                <input
                    {...field}
                    type={checkTypePassword ? InputType.TEXT : type}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    className={`${
                        hasError ? inputClassesWithError : inputClasses
                    }`}
                />
            )}
            {eyeHidden && (
                <span
                    className={styles.inputIcon}
                    role="button"
                    tabIndex={0}
                    onClick={handleClickEye}
                    onKeyDown={handleKeyDown}
                >
                    <FontAwesomeIcon
                        icon={[FaIcons.FA_REGULAR, show]}
                        style={{ color: 'var(--color-password)' }}
                    />
                </span>
            )}

            {hasError && (
                <span className={styles.inputError}>{error as string}</span>
            )}
        </label>
    );
};

export { Input };
