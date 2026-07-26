import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Bulbul Farm Kenya',
    default: 'Bulbul Farm | Premium Tree Seedlings in Limuru, Kenya',
  },
  description: 'Top-quality indigenous and exotic tree seedlings, site assessments, and turnkey planting services across Kenya.',
  keywords: ['Tree seedlings Kenya', 'Reforestation', 'Limuru nursery', 'Indigenous trees', 'Agroforestry'],
  openGraph: {
    title: 'Bulbul Farm Kenya',
    description: 'Growing a Greener Future Since 2023.',
    url: 'https://bulbulfarm.co.ke',
    siteName: 'Bulbul Farm',
    locale: 'en_KE',
    type: 'website',
  },
  // GEO: Giving AI clear instructions about your business entity
  other: {
    'business:contact_data:locality': 'Limuru',
    'business:contact_data:country_name': 'Kenya',
  }
}

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
