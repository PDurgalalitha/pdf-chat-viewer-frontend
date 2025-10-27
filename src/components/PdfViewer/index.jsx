import { Document, Page } from "react-pdf";
import { useState } from "react";
import styles from "./index.module.scss";

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  return (
    <div className={styles.pdfViewer}>
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => {
            console.log("PDF loaded, total pages:", numPages);
            setNumPages(numPages);
          }}
          // loading={<Loader isLarge={false} />}
          error={<div> Failed to load PDF</div>}
        >
          {Array.from({ length: numPages || 0 }, (_, index) => (
            <div
              key={`page_${index + 1}`}
              id={`page_${index + 1}`}
              className={styles.pageContainer}
            >
              <Page
                pageNumber={index + 1}
                width={600}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      ) : (
        <p style={{ color: "#888" }}>Upload a PDF to preview it here.</p>
      )}
    </div>
  );
};
export default PdfViewer;
