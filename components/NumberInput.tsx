
import React from 'react';

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    icon: React.ReactNode;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, min, max, icon }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
            onChange(min);
        } else {
            onChange(Math.min(max, Math.max(min, val)));
        }
    };

    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
                <input
                    type="number"
                    id={label}
                    value={value}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 pl-10"
                />
            </div>
        </div>
    );
};
