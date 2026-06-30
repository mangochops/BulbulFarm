import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/db';

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
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/articles" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/articles" className="text-green-600 hover:text-green-700 font-semibold mb-8 inline-block">
          ← Back to Articles
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.featured_image && (
            <div className="relative w-full h-96 bg-gray-200">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

            <div className="text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
              Published on{' '}
              {new Date(article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
              {article.description}
            </div>
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
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
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {relatedArticle.featured_image && (
                      <div className="relative w-full h-40 bg-gray-200">
                        <Image
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedArticle.description}
                      </p>
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
