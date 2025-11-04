
import React from 'react';

interface BargraphProps {
    value: number;
}

export const Bargraph: React.FC<BargraphProps> = ({ value }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    
    return (
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border border-gray-600">
            <div
                className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-full rounded-full transition-all duration-200 ease-linear"
                style={{ width: `${clampedValue}%` }}
            ></div>
        </div>
    );
};
