import React from 'react';
import { FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import ToolPageTemplate from '../../components/templates/ToolPageTemplate';

const MergePDFPage: React.FC = () => {
    const handleProcess = async (files: File[]): Promise<Blob> => {
        try {
            // Create a new PDF document
            const mergedPdf = await PDFDocument.create();

            // Process each uploaded PDF
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);

                // Copy all pages from this PDF
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

                // Add all copied pages to the merged document
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            // Save the merged PDF
            const pdfBytes = await mergedPdf.save();

            // Return as Blob
            return new Blob([pdfBytes as any], { type: 'application/pdf' });
        } catch (error) {
            console.error('Error merging PDFs:', error);
            throw new Error('Failed to merge PDFs. Please ensure all files are valid PDF documents.');
        }
    };

    return (
        <ToolPageTemplate
            icon={<FileText />}
            title="Merge PDF"
            description="Combine multiple PDF files into one document"
            acceptedFiles="application/pdf"
            maxFiles={10}
            processButtonText="Merge PDFs"
            resultFileName="merged.pdf"
            onProcess={handleProcess}
        />
    );
};

export default MergePDFPage;
