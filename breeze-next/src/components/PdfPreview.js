"use client";

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure le worker local
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ url }) {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full h-48 overflow-hidden rounded border border-gray-200 bg-gray-50 flex justify-center items-center">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<span className="text-gray-400 text-sm">Chargement...</span>}
        error={<span className="text-red-400 text-sm">Erreur de chargement</span>}
      >
        <Page 
          pageNumber={1} 
          width={200}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
