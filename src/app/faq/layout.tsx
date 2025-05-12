import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs | Fortress Technologies',
  description: "Find answers to common questions about our privacy-focused products and services.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
