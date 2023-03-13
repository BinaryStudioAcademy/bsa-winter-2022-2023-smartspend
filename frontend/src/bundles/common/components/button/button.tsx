import React from 'react';

import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    type?: 'button' | 'submit';
    className?: string;
    variant?: 'primary' | 'secondary' | 'plain' | 'round';
    size?: 'medium' | 'small';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<Properties> = ({
    children,
    type = 'button',
    className = '',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
}) => {
    const buttonClasses = [
        styles.button,
        // styles[variant],
        variant === 'round' ? styles.equalRounded : styles[size],
        styles[variant + (disabled ? 'Disabled' : '')],
        className,
    ].join(' ');

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
