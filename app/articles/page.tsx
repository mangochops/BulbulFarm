import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/db';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
        <p className="text-gray-600 mb-12">Learn about our indigenous trees and farming practices.</p>

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No articles published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {article.featured_image && (
                    <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
