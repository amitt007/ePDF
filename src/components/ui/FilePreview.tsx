import React from 'react';
import { FileText, Image as ImageIcon, FileType, X } from 'lucide-react';
import { formatFileSize, getFileExtension } from '../../utils/fileHelpers';
import './FilePreview.css';

export interface FilePreviewProps {
    file: File;
    onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
    const getFileIcon = (file: File) => {
        const ext = getFileExtension(file.name);

        if (file.type.startsWith('image/')) {
            return <ImageIcon size={24} />;
        }
        if (file.type === 'application/pdf' || ext === 'pdf') {
            return <FileText size={24} />;
        }
        return <FileType size={24} />;
    };

    return (
        <div className="file-preview">
            <div className="file-preview-icon">{getFileIcon(file)}</div>

            <div className="file-preview-info">
                <p className="file-preview-name" title={file.name}>
                    {file.name}
                </p>
                <p className="file-preview-size">{formatFileSize(file.size)}</p>
            </div>

            <button
                className="file-preview-remove"
                onClick={onRemove}
                aria-label="Remove file"
                type="button"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default FilePreview;
