import classNames from 'classnames';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    type InputLabel,
    type InputPlaceholder,
    type InputSize,
    type InputType,
} from '~/bundles/common/enums/enums.js';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: InputLabel;
    name: FieldPath<T>;
    placeholder?: InputPlaceholder;
    type?: InputType;
    className?: string;
    size?: InputSize;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    type,
    className = '',
    size,
}: Properties<T>): JSX.Element => {
    const inputClasses = classNames(
        styles.input,
        label === 'E-mail' && size === 'medium' ? styles.emailMedium : '',
        label === 'E-mail' && size === 'small' ? styles.emailSmall : '',
        label === 'Password' ? styles.password : '',
        label === 'By note' && size === 'medium' ? styles.noteMedium : '',
        label === 'By note' && size === 'small' ? styles.noteSmall : '',
        label === 'Amount' ? styles.amount : '',
        className,
    );
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <label>
            <span>{label}</span>
            <input
                {...field}
                type={type}
                placeholder={placeholder}
                className={inputClasses}
            />
            {hasError && <span>{error as string}</span>}
        </label>
    );
};

export { Input };
