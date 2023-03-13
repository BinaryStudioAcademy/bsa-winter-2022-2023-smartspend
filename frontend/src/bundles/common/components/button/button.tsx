import React from 'react';

import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'plain' | 'round';
    size?: 'medium' | 'small';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<Properties> = ({
    children,
    className = '',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
}) => {
    const buttonClasses = [
        styles.button,
        variant === 'round' ? styles.equalRounded : styles[size],
        styles[variant + (disabled ? 'Disabled' : '')],
        className,
    ].join(' ');

    return (
        <button className={buttonClasses} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export { Button };
