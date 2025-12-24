import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full-width',
        loading && 'btn-loading',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="btn-spinner" />
                    <span className="btn-text">Processing...</span>
                </>
            ) : (
                <>
                    {icon && <span className="btn-icon">{icon}</span>}
                    <span className="btn-text">{children}</span>
                </>
            )}
        </button>
    );
};

export default Button;
