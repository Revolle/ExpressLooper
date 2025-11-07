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
            <label className="flex justify-between items-center text-sm font-medium text-[#C4C7C5] mb-2">
                <span>{label}</span>
                <span className="text-[#A5C9FF] font-semibold">{value}</span>
            </label>
            <div className="relative h-8 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
            </div>
             <style>{`
                .slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: transparent;
                }
                .slider-thumb::-webkit-slider-runnable-track {
                    height: 4px;
                    background-image: linear-gradient(to right, #A5C9FF ${percentage}%, #444746 ${percentage}%);
                    border-radius: 2px;
                }
                .slider-thumb::-moz-range-track {
                     height: 4px;
                    background-image: linear-gradient(to right, #A5C9FF ${percentage}%, #444746 ${percentage}%);
                    border-radius: 2px;
                }
                .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    margin-top: -8px;
                    width: 20px;
                    height: 20px;
                    background: #A5C9FF;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                    transition: all .2s ease-in-out;
                }
                 .slider-thumb:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 8px rgba(165, 201, 255, 0.25);
                }
                .slider-thumb::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #A5C9FF;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                    transition: all .2s ease-in-out;
                }
                .slider-thumb:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 8px rgba(165, 201, 255, 0.25);
                }
            `}</style>
        </div>
    );
};