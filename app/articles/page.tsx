import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/db';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Articles & Insights</h1>
            <p className="text-lg text-gray-600">Discover stories about indigenous trees, sustainable farming, and nature&apos;s wisdom.</p>
          </div>
          <Link
            href="/admin"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <span>+</span>
            <span>Add Article</span>
          </Link>
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
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group"
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
                      <time className="text-xs text-gray-500 font-medium">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
