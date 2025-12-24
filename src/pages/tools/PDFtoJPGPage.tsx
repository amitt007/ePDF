import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import ToolPageTemplate from '../../components/templates/ToolPageTemplate';
import './PDFtoJPGPage.css';

const PDFtoJPGPage: React.FC = () => {
    const [quality, setQuality] = useState(85);

    const handleProcess = async (files: File[]): Promise<Blob> => {
        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const zip = new JSZip();
            const totalPages = pdf.numPages;

            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 2.0 }); // High resolution

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) throw new Error('Could not get canvas context');

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                    canvas: canvas,
                }).promise;

                // Convert canvas to JPG blob
                const blob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob(
                        (blob) => {
                            if (blob) resolve(blob);
                            else reject(new Error('Failed to create blob'));
                        },
                        'image/jpeg',
                        quality / 100
                    );
                });

                zip.file(`page_${pageNum}.jpg`, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            return zipBlob;
        } catch (error) {
            console.error('Error converting PDF to JPG:', error);
            throw new Error('Failed to convert PDF to JPG. Please ensure the file is a valid PDF document.');
        }
    };

    return (
        <ToolPageTemplate
            icon={<ImageIcon />}
            title="PDF to JPG"
            description="Convert PDF pages to JPG images"
            acceptedFiles="application/pdf"
            maxFiles={1}
            processButtonText="Convert to JPG"
            resultFileName="images.zip"
            onProcess={handleProcess}
        >
            <div className="conversion-options">
                <h3 className="options-title">Conversion Settings</h3>

                <div className="quality-control">
                    <label htmlFor="quality-slider">
                        Image Quality: <strong>{quality}%</strong>
                    </label>
                    <input
                        id="quality-slider"
                        type="range"
                        min="60"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value))}
                        className="quality-slider"
                    />
                    <div className="quality-labels">
                        <span>Lower size</span>
                        <span>Higher quality</span>
                    </div>
                </div>

                <div className="info-note">
                    All pages will be converted to JPG images and downloaded as a ZIP file.
                </div>
            </div>
        </ToolPageTemplate>
    );
};

export default PDFtoJPGPage;
