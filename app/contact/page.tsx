import { Metadata } from "next"
import ContactClient from "./ContactClient"

// 1. Next.js Metadata (SEO & OpenGraph)
export const metadata: Metadata = {
    title: "Contact Bulbul Farm Nursery | Tree Seedlings & Consulting in Limuru, Kenya",
    description: "Get in touch with Bulbul Farm Tree Nursery in Limuru, Kenya. Contact us for indigenous and exotic tree seedling inquiries, bulk agroforestry orders, site planting visits, or nationwide delivery.",
    keywords: [
        "Contact Bulbul Farm",
        "Tree nursery Limuru contact",
        "Buy tree seedlings Kiambu Kenya",
        "Agroforestry consultation Kenya",
        "Tree planting services Kenya phone number"
    ],
    openGraph: {
        title: "Contact Bulbul Farm Nursery | Tree Seedlings & Agroforestry",
        description: "Reach out to our agronomy team in Limuru for indigenous tree seedling inquiries, site assessment visits, and countrywide delivery in Kenya.",
        url: "https://bulbulfarm.co.ke/contact",
        siteName: "Bulbul Farm",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Bulbul Farm Limuru Kenya",
            },
        ],
    },
    alternates: {
        canonical: "https://bulbulfarm.co.ke/contact",
    },
    // 2. GEO Location Metadata for AI Engine Optimization
    other: {
        "geo.region": "KE-22",
        "geo.placename": "Limuru",
        "geo.position": "-1.1118;36.6025",
        "ICBM": "-1.1118, 36.6025"
    }
}

export default function ContactPage() {
    // 3. Structured Data (JSON-LD) for Google & Generative Search Engines (LocalBusiness / Nursery)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "GardenStore",
        "name": "Bulbul Farm Tree Nursery",
        "image": "https://bulbulfarm.co.ke/woodland-silhouette.jpg",
        "url": "https://bulbulfarm.co.ke/contact",
        "telephone": "+254726931982",
        "email": "info@bulbulfarm.co.ke",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Limuru Road",
            "addressLocality": "Limuru",
            "addressRegion": "Kiambu County",
            "addressCountry": "KE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -1.1118,
            "longitude": 36.6025
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "07:30",
                "closes": "18:00"
            }
        ],
        "priceRange": "$$"
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactClient />
        </>
    )
}