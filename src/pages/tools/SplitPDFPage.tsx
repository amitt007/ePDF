import React, { useState } from 'react';
import { Scissors } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import ToolPageTemplate from '../../components/templates/ToolPageTemplate';
import './SplitPDFPage.css';

const SplitPDFPage: React.FC = () => {
    const [mode, setMode] = useState<'all' | 'range'>('all');
    const [fromPage, setFromPage] = useState(1);
    const [toPage, setToPage] = useState(1);

    const handleProcess = async (files: File[]): Promise<Blob> => {
        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            if (mode === 'all') {
                // Extract all pages as separate PDFs in a ZIP
                const zip = new JSZip();

                for (let i = 0; i < totalPages; i++) {
                    const newPdf = await PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                    newPdf.addPage(copiedPage);

                    const pdfBytes = await newPdf.save();
                    zip.file(`page_${i + 1}.pdf`, pdfBytes as any);
                }

                const zipBlob = await zip.generateAsync({ type: 'blob' });
                return zipBlob;
            } else {
                // Extract page range
                const from = Math.max(1, Math.min(fromPage, totalPages));
                const to = Math.max(from, Math.min(toPage, totalPages));

                const newPdf = await PDFDocument.create();
                const pageIndices = Array.from(
                    { length: to - from + 1 },
                    (_, i) => from - 1 + i
                );
                const copiedPages = await newPdf.copyPages(pdf, pageIndices);
                copiedPages.forEach((page) => newPdf.addPage(page));

                const pdfBytes = await newPdf.save();
                return new Blob([pdfBytes as any], { type: 'application/pdf' });
            }
        } catch (error) {
            console.error('Error splitting PDF:', error);
            throw new Error('Failed to split PDF. Please ensure the file is a valid PDF document.');
        }
    };

    return (
        <ToolPageTemplate
            icon={<Scissors />}
            title="Split PDF"
            description="Extract pages from your PDF files"
            acceptedFiles="application/pdf"
            maxFiles={1}
            processButtonText="Split PDF"
            resultFileName={mode === 'all' ? 'pages.zip' : 'extracted.pdf'}
            onProcess={handleProcess}
        >
            <div className="split-options">
                <h3 className="options-title">Split Options</h3>

                <label className="option-label">
                    <input
                        type="radio"
                        name="mode"
                        value="all"
                        checked={mode === 'all'}
                        onChange={(e) => setMode(e.target.value as 'all')}
                    />
                    <span>Extract all pages as separate PDFs (ZIP file)</span>
                </label>

                <label className="option-label">
                    <input
                        type="radio"
                        name="mode"
                        value="range"
                        checked={mode === 'range'}
                        onChange={(e) => setMode(e.target.value as 'range')}
                    />
                    <span>Extract page range</span>
                </label>

                {mode === 'range' && (
                    <div className="range-inputs">
                        <div className="input-group">
                            <label htmlFor="from-page">From page:</label>
                            <input
                                id="from-page"
                                type="number"
                                min="1"
                                value={fromPage}
                                onChange={(e) => setFromPage(parseInt(e.target.value) || 1)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="to-page">To page:</label>
                            <input
                                id="to-page"
                                type="number"
                                min="1"
                                value={toPage}
                                onChange={(e) => setToPage(parseInt(e.target.value) || 1)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </ToolPageTemplate>
    );
};

export default SplitPDFPage;
