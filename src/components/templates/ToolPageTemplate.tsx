import React, { useState } from 'react';
import { Download } from 'lucide-react';
import FileUploader from '../ui/FileUploader';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import { downloadFile } from '../../utils/fileHelpers';
import './ToolPageTemplate.css';

export interface ToolPageTemplateProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    acceptedFiles: string;
    maxFiles?: number;
    children?: React.ReactNode; // For tool-specific options/settings
    onProcess: (files: File[]) => Promise<Blob>;
    processButtonText?: string;
    resultFileName?: string;
}

const ToolPageTemplate: React.FC<ToolPageTemplateProps> = ({
    icon,
    title,
    description,
    acceptedFiles,
    maxFiles = 1,
    children,
    onProcess,
    processButtonText = 'Process Files',
    resultFileName = 'result.pdf',
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleProcess = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setProgress(0);
        setError(null);
        setResult(null);

        try {
            // Simulate progress (real PDF processing will update this)
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const blob = await onProcess(files);

            clearInterval(progressInterval);
            setProgress(100);
            setResult(blob);
            setIsProcessing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsProcessing(false);
            setProgress(0);
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile(result, resultFileName);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setResult(null);
        setError(null);
        setProgress(0);
    };

    return (
        <div className="tool-page">
            <div className="container">
                <div className="tool-page-content">
                    {/* Header */}
                    <div className="tool-page-header">
                        <div className="tool-page-icon-wrapper">
                            <div className="tool-page-icon">{icon}</div>
                        </div>
                        <h1 className="tool-page-title">{title}</h1>
                        <p className="tool-page-description">{description}</p>
                    </div>

                    {/* Main Content */}
                    <div className="tool-page-main">
                        {/* File Uploader */}
                        <section className="tool-page-section">
                            <FileUploader
                                accept={acceptedFiles}
                                maxFiles={maxFiles}
                                onFilesChange={setFiles}
                                files={files}
                                disabled={isProcessing}
                            />
                        </section>

                        {/* Tool-specific Options (if provided) */}
                        {children && files.length > 0 && !result && (
                            <section className="tool-page-section tool-page-options">
                                {children}
                            </section>
                        )}

                        {/* Processing Progress */}
                        {isProcessing && (
                            <section className="tool-page-section">
                                <ProgressBar progress={progress} />
                            </section>
                        )}

                        {/* Error Message */}
                        {error && (
                            <section className="tool-page-section">
                                <div className="tool-page-error">
                                    <p>{error}</p>
                                    <Button variant="outline" onClick={handleReset}>
                                        Try Again
                                    </Button>
                                </div>
                            </section>
                        )}

                        {/* Success Result */}
                        {result && (
                            <section className="tool-page-section">
                                <div className="tool-page-success">
                                    <div className="success-icon">✓</div>
                                    <h3>Processing Complete!</h3>
                                    <p>Your file is ready to download.</p>
                                    <div className="tool-page-actions">
                                        <Button
                                            icon={<Download size={20} />}
                                            onClick={handleDownload}
                                            size="lg"
                                        >
                                            Download File
                                        </Button>
                                        <Button variant="outline" onClick={handleReset} size="lg">
                                            Process Another File
                                        </Button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Process Button */}
                        {files.length > 0 && !result && !isProcessing && (
                            <section className="tool-page-section">
                                <Button
                                    onClick={handleProcess}
                                    size="lg"
                                    fullWidth
                                    disabled={isProcessing}
                                >
                                    {processButtonText}
                                </Button>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolPageTemplate;
