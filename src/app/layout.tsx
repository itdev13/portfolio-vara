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
  title: "Varaprasad Prasad - Lead Engineer & Freelance Expert | React, Node.js, Python",
  description: "🚀 Lead Engineer @HighLevel with 5+ years experience in React, Node.js, Python, AWS. Expert freelancer for EdTech, FinTech, CRM projects. AroundU founder. Available for technical consulting & full-stack development.",
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
    google: "your-google-verification-code-here", // Replace with actual code from Google Search Console
    yandex: "your-yandex-verification-code", // Optional: Yandex verification
  },
  alternates: {
    canonical: "https://www.varaprasad.dev",
  },
  category: "Technology",
  classification: "Software Engineering Portfolio",
  openGraph: {
    title: "Varaprasad Prasad - Lead Engineer & Freelance Expert",
    description: "🚀 Lead Engineer @HighLevel | 5+ years React, Node.js, Python | EdTech, FinTech, CRM Expert | AroundU Founder | Available for freelance projects",
    type: "website",
    locale: "en_US",
    siteName: "Varaprasad Prasad - Lead Engineer Portfolio",
    url: "https://www.varaprasad.dev",
    images: [
      {
        url: "https://www.varaprasad.dev/social-banner.svg",
        width: 1200,
        height: 630,
        alt: "Varaprasad Prasad - Lead Engineer & Freelance Expert | React, Node.js, Python, AWS",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Varaprasad Prasad - Lead Engineer & Freelancer",
    description: "🚀 Lead Engineer @HighLevel | React, Node.js, Python Expert | 5+ years EdTech/FinTech/CRM | Available for freelance projects",
    images: ["https://www.varaprasad.dev/social-banner.svg"],
    creator: "@J_VARAPRASAD9",
    site: "@J_VARAPRASAD9",
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
