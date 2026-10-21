'use client';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { defaultCVData } from '../cvData';
import { CvDocument } from './CvDocument';

export default function CvPdfViewer() {
  return (
    <div className="cv-pdf">
      <div className="cv-pdf-bar no-print">
        <PDFDownloadLink
          document={<CvDocument data={defaultCVData} />}
          fileName="Quach-Gia-Bao-CV.pdf"
          className="btn btn-primary"
        >
          {({ loading }) => (loading ? 'Preparing…' : 'Download PDF')}
        </PDFDownloadLink>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
        <a className="btn btn-ghost" href="/">
          ← Back to Hub
        </a>
      </div>
      <PDFViewer className="cv-pdf-frame" style={{ width: '100%', height: '82vh' }} showToolbar={false}>
        <CvDocument data={defaultCVData} />
      </PDFViewer>
    </div>
  );
}
