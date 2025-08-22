import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varaprasad Prasad | Lead Engineer | SEO Expert | Freelancer | Vara Jaladanki",
  description: "Lead Engineer Varaprasad Prasad (Vara Jaladanki) - Expert in React, Node.js, Python, AWS. Best freelancer for technical problem solving, SEO optimization, system design. 5+ years cross-domain expertise in EdTech, FinTech, CRM. AroundU founder.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '64x64' }
    ],
    apple: '/icon.svg',
    shortcut: '/favicon.svg'
  },
  manifest: '/manifest.json',
  keywords: "Varaprasad Prasad, Vara, Jaladanki, Lead Engineer, SEO Expert, Freelancer, Technical Problem Solver, React Developer, Node.js, Python, AWS, System Design, HighLevel, AroundU Founder, Full Stack Developer, EdTech, FinTech, CRM, Bangalore Engineer, India Developer, Best Freelancer India, Technical Consultant, Software Architect",
  authors: [{ name: "Varaprasad Prasad" }, { name: "Vara Jaladanki" }],
  creator: "Varaprasad Prasad",
  publisher: "Varaprasad Prasad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  category: "Technology",
  classification: "Software Engineering Portfolio",
  openGraph: {
    title: "Varaprasad Prasad | Lead Engineer | SEO Expert | Technical Problem Solver",
    description: "Lead Engineer with 5+ years expertise. Best freelancer for React, Node.js, Python, AWS. SEO optimization specialist. AroundU founder.",
    type: "website",
    locale: "en_US",
    siteName: "Varaprasad Prasad Portfolio",
    url: "https://your-domain.com",
    images: [
      {
        url: "/jvvprasad.jpg",
        width: 1200,
        height: 630,
        alt: "Varaprasad Prasad - Lead Engineer & SEO Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varaprasad Prasad | Lead Engineer | SEO Expert",
    description: "Lead Engineer & Technical Problem Solver. Expert in React, Node.js, Python, AWS. Best freelancer for system design & SEO optimization.",
    images: ["/jvvprasad.jpg"],
    creator: "@your-twitter-handle",
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bangalore",
    "geo.position": "12.9716;77.5946",
    "ICBM": "12.9716, 77.5946",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "7 days",
    "language": "en",
    "coverage": "worldwide",
    "target": "all",
    "HandheldFriendly": "true",
    "MobileOptimized": "width",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#3b82f6",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-navbutton-color": "#3b82f6",
    "apple-mobile-web-app-title": "Varaprasad Prasad",
    "application-name": "Varaprasad Prasad Portfolio",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
