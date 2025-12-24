export interface PDFFile extends File {
    type: 'application/pdf';
}

export interface ProcessingState {
    status: 'idle' | 'processing' | 'success' | 'error';
    progress: number;
    message?: string;
    error?: string;
}

export interface Tool {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    href: string;
    category: 'edit' | 'convert' | 'organize';
}

export interface FileWithPreview extends File {
    preview?: string;
    thumbnail?: string;
}
