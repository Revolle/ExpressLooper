
import React, { useRef, useState } from 'react';
import { UploadCloud } from './Icons';


interface FilePickerProps {
    onFileChange: (file: File | null) => void;
}

export const FilePicker: React.FC<FilePickerProps> = ({ onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFileName(file ? file.name : '');
        onFileChange(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="video/*"
            />
            <div
                onClick={handleClick}
                className="flex justify-center items-center w-full px-6 py-8 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
            >
                <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-400">
                        <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Any video file</p>
                </div>
            </div>
        </div>
    );
};
