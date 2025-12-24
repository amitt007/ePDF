import React from 'react';
import { Minimize2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageTemplate from '../../components/templates/ToolPageTemplate';

const CompressPDFPage: React.FC = () => {
    const handleProcess = async (files: File[]): Promise<Blob> => {
        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);

            // Save with compression options
            // pdf-lib will optimize the PDF structure
            const pdfBytes = await pdf.save({
                useObjectStreams: true,  // Compress object streams
                addDefaultPage: false,   // Don't add extra pages
            });

            return new Blob([pdfBytes as any], { type: 'application/pdf' });
        } catch (error) {
            console.error('Error compressing PDF:', error);
            throw new Error('Failed to compress PDF. Please ensure the file is a valid PDF document.');
        }
    };

    return (
        <ToolPageTemplate
            icon={<Minimize2 />}
            title="Compress PDF"
            description="Optimize PDF structure and remove redundant data"
            acceptedFiles="application/pdf"
            maxFiles={1}
            processButtonText="Optimize PDF"
            resultFileName="optimized.pdf"
            onProcess={handleProcess}
        >
            <div style={{
                padding: 'var(--spacing-lg)',
                background: 'var(--color-orange-lightest)',
                border: '2px solid var(--color-primary-orange)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                color: 'var(--color-neutral-black)'
            }}>
                <strong>⚠️ Current Limitations:</strong>
                <p style={{ margin: 'var(--spacing-sm) 0 0 0' }}>
                    This tool optimizes the PDF structure but <strong>cannot compress images</strong>,
                    which is the main factor in file size. Expected results:
                </p>
                <ul style={{ marginTop: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-xl)', marginBottom: 'var(--spacing-sm)' }}>
                    <li><strong>Text-heavy PDFs:</strong> May see 10-30% reduction</li>
                    <li><strong>Image-heavy PDFs:</strong> Minimal change (&lt;5%)</li>
                    <li><strong>Already compressed PDFs:</strong> No reduction</li>
                </ul>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-gray-700)' }}>
                    <em>💡 Advanced compression with image optimization coming soon!</em>
                </p>
            </div>
        </ToolPageTemplate>
    );
};

export default CompressPDFPage;
