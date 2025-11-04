
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'md' | 'lg';
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'secondary', size = 'md', icon }) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
    
    const variantClasses = {
        primary: 'bg-cyan-600 hover:bg-cyan-500 text-white focus:ring-cyan-500',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 focus:ring-gray-500'
    };

    const sizeClasses = {
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};
