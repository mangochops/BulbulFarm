import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

// 1. Next.js Metadata (SEO & OpenGraph)
export const metadata: Metadata = {
  title: "Tree Seedlings Catalog | Indigenous & Exotic Trees in Kenya",
  description: "Browse our tree nursery catalog in Limuru, Kenya. High-survival indigenous and exotic tree seedlings, timber stock, and fruit trees for landscaping and reforestation.",
  keywords: [
    "Tree seedlings Kenya",
    "Buy indigenous trees Kenya",
    "Limuru tree nursery catalog",
    "Exotic timber seedlings Kenya",
    "Fruit tree seedlings Kiambu",
    "Bulbul Farm products"
  ],
  openGraph: {
    title: "Tree Seedlings Catalog | Bulbul Farm Kenya",
    description: "Explore climate-hardened indigenous and exotic tree seedlings propagated for high survival rates across Kenya.",
    url: "https://bulbulfarm.co.ke/products",
    siteName: "Bulbul Farm",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
        width: 1200,
        height: 630,
        alt: "Bulbul Farm Tree Nursery Catalog",
      },
    ],
  },
  alternates: {
    canonical: "https://bulbulfarm.co.ke/products",
  },
  // 2. GEO Location Metadata for AI Generative Search Engines
  other: {
    "geo.region": "KE-22", // Kiambu County
    "geo.placename": "Limuru",
    "geo.position": "-1.1118;36.6025",
    "ICBM": "-1.1118, 36.6025"
  }
};

export default function ProductsPage() {
  // 3. AEO Schema Markup (JSON-LD) for Search & AI Answer Engines (Store & ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Bulbul Farm Tree Nursery",
    "description": "High-quality indigenous and exotic tree seedlings nursery in Limuru, Kenya.",
    "url": "https://bulbulfarm.co.ke/products",
    "telephone": "+254726931982",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Limuru",
      "addressRegion": "Kiambu",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.1118,
      "longitude": 36.6025
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tree Seedling Nursery Stock",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Indigenous Seedlings"
        },
        {
          "@type": "OfferCatalog",
          "name": "Exotic Timber Seedlings"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient />
    </>
  );
}