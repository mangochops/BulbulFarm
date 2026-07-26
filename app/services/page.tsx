import { Metadata } from "next"
import ServicesClient from "./ServicesClient"

// 1. Next.js Metadata (SEO & OpenGraph)
export const metadata: Metadata = {
    title: "Professional Tree Services, Soil Analysis & Seedlings",
    description: "End-to-end forestry services in Kenya: scientific soil analysis, nursery propagation, turnkey planting, and high-survival tree seedlings in Limuru.",
    keywords: [
        "Tree planting services Kenya",
        "Limuru tree nursery",
        "Soil testing for agroforestry Kenya",
        "Turnkey reforestation Kenya",
        "Indigenous seedling supply",
        "Commercial tree planting"
    ],
    openGraph: {
        title: "Services | Bulbul Farm Kenya",
        description: "Professional tree planting, nursery propagation, and site management across Kenya.",
        url: "https://bulbulfarm.co.ke/services",
        siteName: "Bulbul Farm",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
                width: 1200,
                height: 630,
                alt: "Bulbul Farm Forestry Services",
            },
        ],
    },
    alternates: {
        canonical: "https://bulbulfarm.co.ke/services",
    },
    // 2. GEO Tagging for AI Engine context
    other: {
        "geo.region": "KE-22", // Kiambu County
        "geo.placename": "Limuru",
        "geo.position": "-1.1118;36.6025",
        "ICBM": "-1.1118, 36.6025"
    }
}

export default function ServicesPage() {
    // 3. AEO Schema Markup (JSON-LD) for Search Engines & AI Answer Engine Parsing
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Tree Nursery & Professional Agroforestry Services",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Bulbul Farm",
            "image": "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
            "telephone": "+254726931982",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Limuru",
                "addressRegion": "Kiambu",
                "addressCountry": "KE"
            },
            "url": "https://bulbulfarm.co.ke"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Kenya"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Forestry and Tree Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Tree Nursery Propagation",
                        "description": "Propagating climate-hardened indigenous and exotic tree seedlings with a 96.4% survival rate benchmark."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Soil Consultation & Site Assessment",
                        "description": "Scientific soil composition testing and moisture index evaluation for optimal species selection."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Turnkey Planting & Forest Management",
                        "description": "End-to-end site preparation, digging, planting, and post-planting survival audits."
                    }
                }
            ]
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServicesClient />
        </>
    )
}