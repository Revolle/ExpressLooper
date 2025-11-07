import React, { useRef } from 'react';
import { UploadCloud } from './Icons';
import { Button } from './Button';

interface FilePickerProps {
    onFileChange: (file: File | null) => void;
}

export const FilePicker: React.FC<FilePickerProps> = ({ onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="text-center">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="video/*"
            />
            <Button onClick={handleClick} variant="secondary" icon={<UploadCloud />}>
                Select Video File
            </Button>
        </div>
    );
};