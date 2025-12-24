import { create } from 'zustand';

interface FileStore {
    files: File[];
    isProcessing: boolean;
    progress: number;
    result: Blob | null;
    error: string | null;

    // Actions
    addFiles: (files: File[]) => void;
    removeFile: (index: number) => void;
    clearFiles: () => void;
    setProcessing: (isProcessing: boolean) => void;
    setProgress: (progress: number) => void;
    setResult: (result: Blob | null) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
    files: [],
    isProcessing: false,
    progress: 0,
    result: null,
    error: null,

    addFiles: (newFiles) =>
        set((state) => ({
            files: [...state.files, ...newFiles],
            error: null,
        })),

    removeFile: (index) =>
        set((state) => ({
            files: state.files.filter((_, i) => i !== index),
        })),

    clearFiles: () =>
        set({
            files: [],
            error: null,
        }),

    setProcessing: (isProcessing) => set({ isProcessing }),

    setProgress: (progress) => set({ progress }),

    setResult: (result) => set({ result, isProcessing: false, progress: 100 }),

    setError: (error) => set({ error, isProcessing: false }),

    reset: () =>
        set({
            files: [],
            isProcessing: false,
            progress: 0,
            result: null,
            error: null,
        }),
}));

// Expose store to window for debugging (development only)
if (process.env.NODE_ENV === 'development') {
    (window as any).__FILE_STORE__ = useFileStore;
}
