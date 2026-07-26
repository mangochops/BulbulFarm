import { Metadata } from "next"
import AboutClient from "./AboutClient"

// 1. Next.js Metadata (SEO & OpenGraph)
export const metadata: Metadata = {
    title: "About Us | Bulbul Farm Tree Nursery Limuru Kenya",
    description: "Learn about Bulbul Farm Tree Nursery in Limuru, Kenya. Founded in 2023, we specialize in acclimatized indigenous tree seedlings, reforestation, and agronomy consulting.",
    keywords: [
        "About Bulbul Farm",
        "Tree nursery Limuru",
        "Indigenous tree seedlings Kenya",
        "Reforestation services Kenya",
        "Agroforestry Limuru Kiambu"
    ],
    openGraph: {
        title: "About Us | Bulbul Farm Tree Nursery",
        description: "Cultivating resilient tree seedlings and supporting reforestation projects across Kenya from our highlands nursery in Limuru.",
        url: "https://bulbulfarm.co.ke/about",
        siteName: "Bulbul Farm",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "https://bulbulfarm.co.ke/About.jpeg",
                width: 1200,
                height: 630,
                alt: "Inside Bulbul Farm Nursery Limuru",
            },
        ],
    },
    alternates: {
        canonical: "https://bulbulfarm.co.ke/about",
    },
    // GEO Metadata for Search & AI Answer Engine Optimization
    other: {
        "geo.region": "KE-22",
        "geo.placename": "Limuru",
        "geo.position": "-1.1118;36.6025",
        "ICBM": "-1.1118, 36.6025"
    }
}

export default function AboutPage() {
    // 2. Structured Data (JSON-LD) for Search Engines & LLM Engines
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Bulbul Farm",
        "description": "Learn about Bulbul Farm, a premier tree nursery and forestry consultancy located in Limuru, Kenya.",
        "url": "https://bulbulfarm.co.ke/about",
        "mainEntity": {
            "@type": "Organization",
            "name": "Bulbul Farm",
            "foundingDate": "2023",
            "url": "https://bulbulfarm.co.ke",
            "logo": "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Limuru",
                "addressRegion": "Kiambu County",
                "addressCountry": "KE"
            },
            "knowsAbout": [
                "Tree Seedling Propagation",
                "Indigenous Trees",
                "Agroforestry",
                "Reforestation Services",
                "Soil Assessment"
            ]
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AboutClient />
        </>
    )
}