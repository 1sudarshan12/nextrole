import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nextrole — Your remote career, in motion', description: 'Your private remote job search workspace.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
