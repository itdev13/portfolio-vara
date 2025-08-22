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
  keywords: "Varaprasad Prasad, Vara Jaladanki, Lead Engineer, Senior Software Engineer, SEO Expert, Freelancer India, Technical Problem Solver, React Developer, Node.js Developer, Python Developer, AWS Expert, System Design, HighLevel CRM, AroundU Founder, Full Stack Developer, EdTech Expert, FinTech Developer, CRM Developer, Bangalore Engineer, India Developer, Best Freelancer India, Technical Consultant, Software Architect, MongoDB, Firebase, Vue.js, Tailwind CSS, Next.js, JavaScript, TypeScript, Microservices, API Development, Database Design, Cloud Computing, DevOps, Agile Development, Software Engineering, Web Development, Mobile App Development, Startup CTO, Tech Lead, Engineering Manager, Code Review, Performance Optimization, Scalable Systems, Modern Web Technologies",
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
    google: "your-google-verification-code-here", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Optional: Yandex verification
  },
  alternates: {
    canonical: "https://www.varaprasad.dev",
  },
  category: "Technology",
  classification: "Software Engineering Portfolio",
  openGraph: {
    title: "Varaprasad Prasad | Lead Engineer | SEO Expert | Technical Problem Solver",
    description: "Lead Engineer with 5+ years expertise. Best freelancer for React, Node.js, Python, AWS. SEO optimization specialist. AroundU founder.",
    type: "website",
    locale: "en_US",
    siteName: "Varaprasad Prasad Portfolio",
    url: "https://www.varaprasad.dev",
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
