import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'md' | 'lg';
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'secondary', size = 'md', icon }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4';
    
    const variantClasses = {
        primary: 'bg-[#A5C9FF] hover:bg-opacity-90 text-[#001D36] focus:ring-blue-300/50',
        secondary: 'bg-transparent hover:bg-white/10 text-[#A5C9FF] border border-[#747775] focus:ring-blue-300/50',
        tertiary: 'bg-transparent hover:bg-white/10 text-[#A5C9FF] focus:ring-blue-300/50'
    };

    const sizeClasses = {
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {icon && <span className="mr-2 -ml-1 h-5 w-5">{icon}</span>}
            {children}
        </button>
    );
};