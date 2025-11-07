import React from 'react';

// FIX: Define the props interface for the component.
interface DeviceSelectorProps {
    label: string;
    devices: MediaDeviceInfo[];
    selectedDevice: string;
    onSelectDevice: (deviceId: string) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ label, devices, selectedDevice, onSelectDevice }) => {
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <div className="relative">
                <select
                    id={label}
                    value={selectedDevice}
                    onChange={(e) => onSelectDevice(e.target.value)}
                    className="appearance-none bg-gray-700/50 border-b-2 border-gray-600 text-white text-base rounded-t-lg focus:ring-0 focus:border-b-2 focus:border-[#A5C9FF] block w-full py-3 px-4"
                >
                    {devices.length === 0 && <option>No devices found</option>}
                    {devices.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Device ${device.deviceId.substring(0, 8)}`}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
            </div>
        </div>
    );
};
