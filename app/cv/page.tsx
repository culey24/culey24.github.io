'use client';

import { defaultCVData } from '../../src/cvData';
import { HarvardCV } from '../../src/components/HarvardCV';
import { useTheme } from '../../src/useTheme';

export default function CVPage() {
  useTheme();

  return <HarvardCV data={defaultCVData} />;
}