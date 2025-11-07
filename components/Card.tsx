import React from 'react';

interface CardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
    return (
        <div className="bg-[#1E1F22] border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-4">
                <span className="text-[#A5C9FF] mr-3">{icon}</span>
                <h2 className="text-lg font-medium text-white">{title}</h2>
            </div>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
};