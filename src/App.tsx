import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MergePDFPage from './pages/tools/MergePDFPage';
import SplitPDFPage from './pages/tools/SplitPDFPage';
import CompressPDFPage from './pages/tools/CompressPDFPage';
import PDFtoJPGPage from './pages/tools/PDFtoJPGPage';
import JPGtoPDFPage from './pages/tools/JPGtoPDFPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Phase 3: Essential PDF Tools */}
          <Route path="/merge-pdf" element={<MergePDFPage />} />
          <Route path="/split-pdf" element={<SplitPDFPage />} />
          <Route path="/compress-pdf" element={<CompressPDFPage />} />
          <Route path="/pdf-to-jpg" element={<PDFtoJPGPage />} />
          <Route path="/jpg-to-pdf" element={<JPGtoPDFPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
