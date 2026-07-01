'use client';

import { useState } from 'react';
import ArticleForm from '@/app/components/ArticleForm';

interface Article {
  id: number;
  title: string;
  description: string;
  featured_image: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (!expectedPassword) {
      setLoginError('Admin password not configured');
      return;
    }

    if (password === expectedPassword) {
      // In a real app, generate a token on the backend
      const key = expectedPassword;
      setAdminKey(key);
      setAuthenticated(true);
      loadArticles();
    } else {
      setLoginError('Incorrect password');
    }
  };

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        setArticles(await response.json());
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${adminKey}`,
        },
      });

      if (response.ok) {
        setArticles(articles.filter((a) => a.id !== id));
        alert('Article deleted successfully');
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Bulbul Farm</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Admin Login</h2>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Articles Management</h1>
          <button
            onClick={() => {
              setAuthenticated(false);
              setAdminKey('');
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editingArticle ? 'Edit Article' : 'Create Article'}
            </h2>
            <ArticleForm
              article={editingArticle || undefined}
              adminKey={adminKey}
              onSuccess={() => {
                setEditingArticle(null);
                loadArticles(adminKey);
              }}
            />
            {editingArticle && (
              <button
                onClick={() => setEditingArticle(null)}
                className="w-full mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Articles List</h2>
            <div className="space-y-4">
              {articles.length === 0 ? (
                <p className="text-gray-500">No articles yet. Create one to get started!</p>
              ) : (
                articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{article.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
