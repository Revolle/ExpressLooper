
import React from 'react';

interface CardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
                <span className="text-cyan-400 mr-3">{icon}</span>
                <h2 className="text-xl font-semibold text-white">{title}</h2>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};
