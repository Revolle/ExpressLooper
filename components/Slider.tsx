
import React from 'react';

interface SliderProps {
    label: string;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
}

export const Slider: React.FC<SliderProps> = ({ label, value, onChange, min = 0, max = 100 }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
        <div>
            <label className="flex justify-between items-center text-sm font-medium text-gray-300 mb-2">
                <span>{label}</span>
                <span className="text-cyan-400 font-semibold">{value}</span>
            </label>
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{ backgroundSize: `${percentage}% 100%` }}
                />
            </div>
             <style>{`
                .slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: #22d3ee;
                    background-image: linear-gradient(to right, #22d3ee, #06b6d4);
                    background-repeat: no-repeat;
                }
                .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #f0f9ff;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #0891b2;
                    transition: background .2s ease-in-out;
                }
                .slider-thumb::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: #f0f9ff;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #0891b2;
                    transition: background .2s ease-in-out;
                }
                .slider-thumb::-webkit-slider-thumb:hover {
                    background: #e0f2fe;
                }
                .slider-thumb::-moz-range-thumb:hover {
                    background: #e0f2fe;
                }
            `}</style>
        </div>
    );
};
