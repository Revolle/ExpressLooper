
import React from 'react';

interface DeviceSelectorProps {
    label: string;
    devices: MediaDeviceInfo[];
    selectedDevice: string;
    onSelectDevice: (deviceId: string) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ label, devices, selectedDevice, onSelectDevice }) => {
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <select
                id={label}
                value={selectedDevice}
                onChange={(e) => onSelectDevice(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            >
                {devices.length === 0 && <option>No devices found</option>}
                {devices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Device ${device.deviceId.substring(0, 8)}`}
                    </option>
                ))}
            </select>
        </div>
    );
};
