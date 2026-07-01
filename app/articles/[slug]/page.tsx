import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/db';
import { ShareButtons } from '@/app/components/ShareButtons';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articles = getAllArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/articles" className="inline-block text-green-600 hover:text-green-700 font-semibold">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/articles" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-8 group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {article.featured_image && (
            <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-green-50 overflow-hidden">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <time className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h1 className="text-5xl font-bold text-gray-900 mt-4 leading-tight">{article.title}</h1>
            </div>

            <ShareButtons title={article.title} />

            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap mt-8 leading-relaxed">
              {article.description}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600 text-sm mb-4">Help others discover this story</p>
                <ShareButtons title={article.title} />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles
              .filter((a) => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-full flex flex-col">
                    {relatedArticle.featured_image && (
                      <div className="relative w-full h-48 bg-gradient-to-br from-green-100 to-green-50 overflow-hidden">
                        <Image
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow line-clamp-2 mb-3">
                        {relatedArticle.description}
                      </p>
                      <span className="text-sm font-semibold text-green-600 group-hover:translate-x-1 transition-transform inline-block">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
