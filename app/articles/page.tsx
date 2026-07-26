import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/db';
import Navbar from '../components/ArticlesNav';
import Footer from '../components/Footer';

// 1. Next.js Metadata (SEO, OpenGraph, Canonical)
export const metadata: Metadata = {
  title: 'Articles & Insights | Bulbul Farm Tree Nursery',
  description: 'Explore articles and insights on indigenous trees, sustainable farming practices, agroforestry guides, and environmental conservation in Kenya.',
  keywords: [
    'Bulbul Farm articles',
    'Indigenous tree farming Kenya',
    'Agroforestry guides',
    'Tree nursery tips Limuru',
    'Sustainable farming Kenya'
  ],
  openGraph: {
    title: 'Articles & Insights | Bulbul Farm',
    description: 'Discover stories about indigenous trees, sustainable farming, and nature’s wisdom.',
    url: 'https://bulbulfarm.co.ke/articles',
    siteName: 'Bulbul Farm',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: 'https://bulbulfarm.co.ke/woodland-silhouette.jpg',
        width: 1200,
        height: 630,
        alt: 'Bulbul Farm Articles and Insights',
      },
    ],
  },
  alternates: {
    canonical: 'https://bulbulfarm.co.ke/articles',
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  // 2. CollectionPage & ItemList Schema (JSON-LD) for Search Engines & AI Crawlers
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bulbul Farm Articles & Insights',
    description: 'Discover stories about indigenous trees, sustainable farming, and nature\'s wisdom.',
    url: 'https://bulbulfarm.co.ke/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://bulbulfarm.co.ke/articles/${article.slug}`,
        name: article.title,
        description: article.description,
      })),
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <header>
          <Navbar />
        </header>

        <main className="max-w-6xl py-16 mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Articles & Insights</h1>
              <p className="text-lg text-gray-600">Discover stories about indigenous trees, sustainable farming, and nature&apos;s wisdom.</p>
            </div>
          </div>

          {articles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No articles published yet.</p>
              <Link
                href="/admin"
                className="mt-4 inline-block text-green-600 hover:text-green-700 font-semibold"
              >
                Create your first article →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="h-full">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-green-200">
                      {article.featured_image && (
                        <div className="relative w-full h-56 bg-gradient-to-br from-green-100 to-green-50 overflow-hidden">
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col">
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Featured</span>
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-3 line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-4 leading-relaxed">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <time
                            dateTime={new Date(article.created_at).toISOString()}
                            className="text-xs text-gray-500 font-medium"
                          >
                            {new Date(article.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                          <span className="text-sm font-semibold text-green-600 group-hover:translate-x-1 transition-transform">Read →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}