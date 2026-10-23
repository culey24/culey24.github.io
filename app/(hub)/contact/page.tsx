import type { Metadata } from 'next';
import { Contact } from '../../../src/components/Contact';

export const metadata: Metadata = {
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <section className="section blog-head">
        <h1 className="section-title">Get in Touch</h1>
      </section>

      <div className="section">
        <Contact />
      </div>
    </>
  );
}
