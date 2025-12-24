import React from 'react';
import { FileImage } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageTemplate from '../../components/templates/ToolPageTemplate';

const JPGtoPDFPage: React.FC = () => {
    const handleProcess = async (files: File[]): Promise<Blob> => {
        try {
            const pdfDoc = await PDFDocument.create();

            for (const file of files) {
                const imageBytes = await file.arrayBuffer();

                // Embed image based on type
                let image;
                if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    image = await pdfDoc.embedJpg(imageBytes);
                } else if (file.type === 'image/png') {
                    image = await pdfDoc.embedPng(imageBytes);
                } else {
                    throw new Error(`Unsupported image type: ${file.type}`);
                }

                // Get image dimensions
                const { width, height } = image.scale(1);

                // Add page with image dimensions
                const page = pdfDoc.addPage([width, height]);

                // Draw image on page
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                });
            }

            const pdfBytes = await pdfDoc.save();
            return new Blob([pdfBytes as any], { type: 'application/pdf' });
        } catch (error) {
            console.error('Error converting images to PDF:', error);
            throw new Error('Failed to convert images to PDF. Please ensure all files are valid JPG or PNG images.');
        }
    };

    return (
        <ToolPageTemplate
            icon={<FileImage />}
            title="JPG to PDF"
            description="Convert JPG/PNG images to PDF documents"
            acceptedFiles="image/jpeg,image/jpg,image/png"
            maxFiles={20}
            processButtonText="Convert to PDF"
            resultFileName="images.pdf"
            onProcess={handleProcess}
        >
            <div style={{
                padding: 'var(--spacing-md)',
                background: 'var(--color-gray-100)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                color: 'var(--color-gray-700)'
            }}>
                <strong>Tip:</strong> Upload images in the order you want them to appear in the PDF.
                Each image will become a separate page.
            </div>
        </ToolPageTemplate>
    );
};

export default JPGtoPDFPage;
