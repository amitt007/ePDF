/**
 * Format file size in human-readable format
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Validate if file type matches accepted types
 */
export const isValidFileType = (file: File, accept: string): boolean => {
    const acceptedTypes = accept.split(',').map((type) => type.trim());

    return acceptedTypes.some((type) => {
        // Check for wildcard patterns like 'image/*'
        if (type.endsWith('/*')) {
            const baseType = type.split('/')[0];
            return file.type.startsWith(`${baseType}/`);
        }

        // Check for exact MIME type
        if (type.startsWith('.')) {
            // Extension-based check
            return file.name.toLowerCase().endsWith(type.toLowerCase());
        }

        // MIME type check
        return file.type === type;
    });
};

/**
 * Validate file size
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

/**
 * Download blob as file
 */
export const downloadFile = (blob: Blob, filename: string): void => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * Read file as ArrayBuffer
 */
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
};

/**
 * Read file as Data URL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

/**
 * Truncate filename for display
 */
export const truncateFilename = (filename: string, maxLength: number = 30): string => {
    if (filename.length <= maxLength) return filename;

    const extension = getFileExtension(filename);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4);

    return `${truncatedName}...${extension}`;
};
