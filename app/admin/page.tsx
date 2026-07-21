'use client';

import Image from "next/image"
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

interface Product {
  id?: number;
  commonName: string;
  binomialName: string;
  description: string;
  price: string;
  size: string;
  image: string;
  matureImage: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab ('articles' | 'products')
  const [activeTab, setActiveTab] = useState<'articles' | 'products'>('articles');


  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    commonName: '',
    binomialName: '',
    description: '',
    price: 'KSh 0',
    size: '1-2 ft',
    image: '',
    matureImage: '',
  });

  const [seedlingFile, setSeedlingFile] = useState<File | null>(null);
  const [matureFile, setMatureFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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


  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        setProducts(await response.json());
      }
    } catch (error) {
      console.error('Error loading products:', error);
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

  // Convert uploaded image files to base64 string for direct SQLite storage
  const uploadImageFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'products');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${adminKey}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Image upload failed: ${errorData.error || 'Server error'}`);
        return null;
      }

      const data = await res.json();
      return data.url; // e.g. "/uploads/products/172158...-file.jpg"
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Product Form Handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = productForm.image;
      let matureImageUrl = productForm.matureImage;

      // Upload seedling file if chosen
      if (seedlingFile) {
        const uploadedUrl = await uploadImageFile(seedlingFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
        else {
          setIsUploading(false);
          return;
        }
      }

      // Upload mature tree file if chosen
      if (matureFile) {
        const uploadedUrl = await uploadImageFile(matureFile);
        if (uploadedUrl) matureImageUrl = uploadedUrl;
        else {
          setIsUploading(false);
          return;
        }
      }

      const payload = {
        ...productForm,
        image: imageUrl,
        matureImage: matureImageUrl,
      };

      const endpoint = editingProduct?.id ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct?.id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
        setEditingProduct(null);
        setSeedlingFile(null);
        setMatureFile(null);
        setProductForm({
          commonName: '',
          binomialName: '',
          description: '',
          price: 'KSh ',
          size: '',
          image: '',
          matureImage: '',
        });
        loadProducts();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setIsUploading(false);
    }
  }


  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
  };

  const handleDeleteProduct = async (id?: number) => {
    if (!id || !confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${adminKey}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 space-x-4">
          <button
            onClick={() => {
              setActiveTab('articles');
              loadArticles();
            }}
            className={`pb-4 px-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === 'articles'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Articles Management
          </button>
          <button
            onClick={() => {
              setActiveTab('products');
              loadProducts();
            }}
            className={`pb-4 px-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === 'products'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Products / Ecommerce
          </button>
        </div>

        {activeTab === 'articles' && (
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
                  loadArticles();
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
        )}

        {/* Tab 2: Products */}
        {activeTab === 'products' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Tree'}
              </h2>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Common Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.commonName}
                    onChange={(e) => setProductForm({ ...productForm, commonName: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Podocarpus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Binomial / Scientific Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.binomialName}
                    onChange={(e) => setProductForm({ ...productForm, binomialName: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Podocarpus falcatus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. KSh 350"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size / Age</label>
                  <input
                    type="text"
                    required
                    value={productForm.size}
                    onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 1.5 - 2 ft seedling"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seedling Image URL (Primary)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSeedlingFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-lg text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {productForm.image && (
                    <div className="mt-2 text-xs text-green-600 font-medium">✓ Seedling image attached</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grown Tree Image URL (Hover)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMatureFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-lg text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {productForm.matureImage && (
                    <div className="mt-2 text-xs text-green-600 font-medium">✓ Grown tree image attached</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Fast growing, indigenous tree ideal for timber and shade..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition"
                >
                  {isUploading ? 'Uploading & Saving...' : editingProduct ? 'Update Product' : 'Save Product'}
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setSeedlingFile(null);
                      setMatureFile(null);
                      setProductForm({
                        commonName: '',
                        binomialName: '',
                        description: '',
                        price: 'KSh ',
                        size: '',
                        image: '',
                        matureImage: '',
                      });
                    }}
                    className="w-full mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Catalog</h2>
              <div className="space-y-4">
                {products.length === 0 ? (
                  <p className="text-gray-500">No products added yet.</p>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex justify-between items-center border border-gray-100"
                    >
                      <div className="flex space-x-4 items-center">
                        <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden border">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.commonName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{product.commonName}</h3>
                          <p className="text-sm italic text-green-600">{product.binomialName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.price} • {product.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
        )}
      </div>
    </div>
  );
}
