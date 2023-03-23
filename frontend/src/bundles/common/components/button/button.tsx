import classNames from 'classnames';
import React from 'react';

import {
    type ButtonSize,
    type ButtonType,
    type ButtonVariant,
} from '~/bundles/common/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    type?: ButtonType;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<Properties> = ({
    children,
    type,
    className,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
}) => {
    const buttonClasses = classNames(
        styles.button,
        variant === 'round' ? styles.equalRounded : styles[size],
        variant === 'primary' && size === 'small' ? styles.primarySmall : '',
        variant === 'primary' && size === 'medium' ? styles.primaryMedium : '',
        styles[variant + (disabled ? 'Disabled' : '')],
        className,
    );

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export { Button };
