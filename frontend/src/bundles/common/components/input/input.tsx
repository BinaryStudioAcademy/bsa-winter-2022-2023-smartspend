import classNames from 'classnames';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import eye from '~/assets/img/eye.svg';
import eyeSlash from '~/assets/img/eye-slash.svg';
import { InputType } from '~/bundles/common/enums/enums.js';
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
}: Properties<T>): JSX.Element => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordShown((previousState) => !previousState);
    }, []);

    const handleClickEye = useCallback(() => {
        togglePasswordVisibility();
    }, [togglePasswordVisibility]);
    const show = passwordShown ? eye : eyeSlash;

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>): void => {
            if (event.key === 'Enter') {
                handleClickEye();
            }
        },
        [handleClickEye],
    );

    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    const labelClasses = classNames(styles.label, labelClassName);

    const inputClasses = classNames(
        styles.input,
        styles[isDisabled ? 'disabled' : ''],
        inputClassName,
    );

    return (
        <label className={labelClasses}>
            <span className={styles.inputLabel}>{label}</span>
            <input
                {...field}
                type={passwordShown ? InputType.TEXT : type}
                placeholder={placeholder}
                disabled={isDisabled}
                className={`${hasError ? styles.hasError : inputClasses}`}
            />
            {eyeHidden && (
                <span
                    className={styles.inputIcon}
                    role="button"
                    tabIndex={0}
                    onClick={handleClickEye}
                    onKeyDown={handleKeyDown}
                >
                    <img
                        src={show}
                        alt={passwordShown ? 'Hide password' : 'Show password'}
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
