'use client';

import { useState, useEffect } from 'react';
import { UploadButton } from '@/lib/uploadthing';



interface ArticleFormProps {
  article?: {
    id: number;
    title: string;
    description: string;
    featured_image: string | null;
  };
  adminKey: string;
  onSuccess: () => void;
}

export default function ArticleForm({ article, adminKey, onSuccess }: ArticleFormProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [description, setDescription] = useState(article?.description || '');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setFeaturedImage(article.featured_image || '');
    } else {
      setTitle('');
      setDescription('');
      setFeaturedImage('');
    }
  }, [article]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const endpoint = article ? `/api/articles/${article.id}` : '/api/articles';
      const method = article ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({
          title,
          description,
          featured_image: featuredImage,
        }),
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setFeaturedImage('');
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save article');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An error occurred while saving the article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Article title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Article description"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Featured Image
        </label>
        <div className="w-full max-w-full overflow-hidden">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: { ufsUrl: string }[]) => {
              if (res?.[0]) {
                setFeaturedImage(res[0].ufsUrl);
                alert('Featured image uploaded successfully!');
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
            appearance={{
              button:
                'bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors w-full max-w-full cursor-pointer focus-within:ring-2 focus-within:ring-green-500 ut-ready:bg-gray-100 ut-uploading:cursor-not-allowed overflow-hidden box-border',
              container: 'w-full max-w-full flex-col items-stretch overflow-hidden',
              allowedContent: 'text-xs text-gray-500 font-normal text-center mt-1.5',
            }}
            content={{
              button({ ready, isUploading }) {
                if (isUploading) return <span className="text-gray-500">Uploading...</span>;
                if (ready) return <span className="text-gray-700 font-semibold">Choose Image File</span>;
                return <span className="text-gray-400">Loading uploader...</span>;
              },
              allowedContent({ ready, isUploading }) {
                if (!ready || isUploading) return null;
                return 'JPG, PNG, WebP up to 4MB';
              },
            }}
          />
        </div>
        {featuredImage && (
          <div className="mt-2 text-xs text-green-600 font-medium">✓ Featured image attached</div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}



      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
      >
        {isSubmitting ? 'Saving...' : article ? 'Update Article' : 'Create Article'}
      </button>
    </form>
  );
}
