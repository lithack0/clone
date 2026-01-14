import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { ClonesProvider } from '@/hooks/use-clones';

export const metadata: Metadata = {
  title: 'PhishVerse',
  description: 'Clone social media pages for your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <ClonesProvider>
            <div className="flex-grow">{children}</div>
            <footer className="w-full py-4 text-center text-xs text-muted-foreground">
              Made with love by 117h4ck for my Students
            </footer>
            <Toaster />
          </ClonesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
