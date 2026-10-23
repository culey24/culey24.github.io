import type { Metadata } from 'next';
import CvClientPage from '../../src/pdf/CvClientPage';

export const metadata: Metadata = {
  title: 'CV — Bao Quach',
  alternates: { canonical: '/cv/' },
};

export default function CVPage() {
  return <CvClientPage />;
}
