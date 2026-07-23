"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/ArticlesNav";
import Footer from "../components/Footer";
import { Search, ArrowUpDown, ShoppingBag } from "lucide-react";
import { Product } from "../constants";
import { SortOption } from "../constants";



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Helper to extract numerical price for sorting (e.g. "KSh 350" -> 350)
  const parsePrice = (priceStr: string) => {
    const numeric = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(numeric) || 0;
  };

  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      const q = searchQuery.toLowerCase();
      return (
        product.commonName.toLowerCase().includes(q) ||
        product.binomialName.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
      if (sortBy === "name") return a.commonName.localeCompare(b.commonName);
      return 0; // default / featured
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <header>
        <Navbar />
      </header>

      <div className="max-w-6xl py-16 mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Tree Nursery</h1>
          <p className="text-lg text-gray-600">
            Explore our curated selection of indigenous and exotic tree seedlings raised for landscaping and reforestation.
          </p>
        </div>

        {/* E-Commerce Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search trees by name or species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm font-medium text-gray-500">
            Showing <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> trees
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-600 text-lg font-medium mb-2">No trees found matching your search.</p>
            <p className="text-gray-400 text-sm mb-6">Try searching with a different species name or keyword.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-green-500 transition-colors"
            >
              Reset Search
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:border-green-200"
              >
                {/* Image Container with Hover Mature View */}
                <div className="relative overflow-hidden h-64 w-full bg-gradient-to-b from-gray-50 to-emerald-50/30 p-4 flex items-center justify-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.commonName}
                    fill
                    className="object-contain p-2 group-hover:opacity-0 transition-opacity duration-500"
                  />

                  <Image
                    src={product.matureImage || product.image || "/placeholder.svg"}
                    alt={`${product.commonName} - Mature`}
                    fill
                    className="object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* Size Badge */}
                  <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
                    {product.size}
                  </div>

                  {product.matureImage && (
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded opacity-100 group-hover:opacity-0 transition-opacity z-10">
                      Hover to view mature tree 🌳
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                      {product.commonName}
                    </h2>
                    <p className="text-sm text-green-600 italic mb-3">{product.binomialName}</p>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
