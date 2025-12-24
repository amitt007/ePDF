import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Get number of pages in PDF
 */
export const getPDFPageCount = async (file: File): Promise<number> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        return pdf.numPages;
    } catch (error) {
        console.error('Error getting PDF page count:', error);
        throw new Error('Failed to read PDF file');
    }
};

/**
 * Generate thumbnail for PDF first page
 */
export const generatePDFThumbnail = async (
    file: File,
    maxWidth: number = 200
): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        const scale = maxWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not get canvas context');

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
            canvasContext: context,
            viewport: scaledViewport,
            canvas: canvas,
        }).promise;

        return canvas.toDataURL('image/jpeg', 0.8);
    } catch (error) {
        console.error('Error generating PDF thumbnail:', error);
        throw new Error('Failed to generate PDF preview');
    }
};

/**
 * Render PDF page to canvas
 */
export const renderPDFPage = async (
    file: File,
    pageNumber: number,
    canvas: HTMLCanvasElement,
    scale: number = 1.5
): Promise<void> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({ scale });
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not get canvas context');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas,
        }).promise;
    } catch (error) {
        console.error('Error rendering PDF page:', error);
        throw new Error('Failed to render PDF page');
    }
};
