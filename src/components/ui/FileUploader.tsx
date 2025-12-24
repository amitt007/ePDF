import React, { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { isValidFileType, isValidFileSize } from '../../utils/fileHelpers';
import FilePreview from './FilePreview';
import './FileUploader.css';

export interface FileUploaderProps {
    accept: string;
    maxFiles?: number;
    maxSize?: number; // in MB
    onFilesChange: (files: File[]) => void;
    disabled?: boolean;
    files?: File[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
    accept,
    maxFiles = 1,
    maxSize = 50,
    onFilesChange,
    disabled = false,
    files = [],
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFiles = useCallback(
        (fileList: FileList | File[]): { valid: File[]; errors: string[] } => {
            const filesArray = Array.from(fileList);
            const errors: string[] = [];
            const valid: File[] = [];

            for (const file of filesArray) {
                // Check file type
                if (!isValidFileType(file, accept)) {
                    errors.push(`${file.name}: Invalid file type`);
                    continue;
                }

                // Check file size
                if (!isValidFileSize(file, maxSize)) {
                    errors.push(`${file.name}: File size exceeds ${maxSize}MB`);
                    continue;
                }

                valid.push(file);
            }

            // Check max files
            if (files.length + valid.length > maxFiles) {
                errors.push(`Maximum ${maxFiles} file(s) allowed`);
                return { valid: [], errors };
            }

            return { valid, errors };
        },
        [accept, maxSize, maxFiles, files.length]
    );

    const handleFiles = useCallback(
        (fileList: FileList | File[]) => {
            const { valid, errors } = validateFiles(fileList);

            if (errors.length > 0) {
                setError(errors[0]);
                setTimeout(() => setError(null), 5000);
            }

            if (valid.length > 0) {
                onFilesChange([...files, ...valid]);
                setError(null);
            }
        },
        [validateFiles, onFilesChange, files]
    );

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            handleFiles(droppedFiles);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            handleFiles(selectedFiles);
        }
        // Reset input value to allow re-uploading same file
        e.target.value = '';
    };

    const handleClick = () => {
        if (!disabled) {
            inputRef.current?.click();
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        onFilesChange(updatedFiles);
    };

    return (
        <div className="file-uploader-container">
            <div
                className={`file-uploader ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''
                    }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={maxFiles > 1}
                    onChange={handleInputChange}
                    disabled={disabled}
                    style={{ display: 'none' }}
                />

                <div className="file-uploader-content">
                    <Upload className="file-uploader-icon" size={48} />
                    <h3 className="file-uploader-title">
                        {isDragging ? 'Drop files here' : 'Drag & drop or click to upload'}
                    </h3>
                    <p className="file-uploader-subtitle">
                        {accept === 'application/pdf'
                            ? 'PDF files only'
                            : accept.startsWith('image/')
                                ? 'Image files only'
                                : 'Supported files'}
                        {' • '}
                        Max {maxSize}MB per file
                    </p>
                </div>
            </div>

            {error && (
                <div className="file-uploader-error">
                    <X size={16} />
                    <span>{error}</span>
                </div>
            )}

            {files.length > 0 && (
                <div className="file-previews">
                    {files.map((file, index) => (
                        <FilePreview
                            key={`${file.name}-${index}`}
                            file={file}
                            onRemove={() => handleRemoveFile(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
