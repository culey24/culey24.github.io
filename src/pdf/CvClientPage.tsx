'use client';

import dynamic from 'next/dynamic';

// @react-pdf/renderer touches browser APIs, so it must not be server-rendered.
const CvPdfViewer = dynamic(() => import('./CvPdfViewer'), {
  ssr: false,
  loading: () => <p className="cv-loading">Loading CV…</p>,
});

export default function CvClientPage() {
  return <CvPdfViewer />;
}
