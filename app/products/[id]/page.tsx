import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@libsql/client/web";
import Navbar from "@/app/components/ArticlesNav";
import Footer from "@/app/components/Footer";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Product {
  id: number;
  commonName: string;
  binomialName: string;
  description: string;
  price: string;
  size: string;
  image: string;
  matureImage?: string;
  created_at?: string;
}

function getDbClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN is missing.");
  }

  return createClient({ url, authToken });
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const db = getDbClient();
    const result = await db.execute({
      sql: "SELECT * FROM products WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as unknown as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Parse numerical price for Schema.org (e.g. "KSh 350" -> 350)
  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;

  // Schema.org Product Payload
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.commonName} (${product.binomialName})`,
    image: [product.image].filter(Boolean),
    description: product.description,
    sku: `SEEDLING-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Bulbul Farm",
    },
    offers: {
      "@type": "Offer",
      url: `https://bulbulfarm.co.ke/products/${product.id}`,
      priceCurrency: "KES",
      price: numericPrice,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      {/* Inject Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <Navbar />
      </header>

      <div className="max-w-5xl mx-auto py-12">
        <Link
          href="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-8 group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Trees
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 grid md:grid-cols-2 gap-8">
          {/* Left Column: Image Showcase */}
          <div className="p-6 bg-gradient-to-b from-gray-50 to-emerald-50/20 flex flex-col gap-4">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.commonName}
                fill
                className="object-contain p-4"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Seedling
              </span>
            </div>

            {product.matureImage && (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-gray-100">
                <Image
                  src={product.matureImage}
                  alt={`${product.commonName} mature tree`}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md">
                  Mature Canopy Preview
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Product Information */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.size} Seedling
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.commonName}</h1>
              <p className="text-lg text-green-600 italic mb-6">{product.binomialName}</p>

              <div className="text-3xl font-bold text-gray-900 mb-6">{product.price}</div>

              <div className="border-t border-b border-gray-100 py-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description & Care</h3>
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Service Highlights */}
              <div className="space-y-3 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>Healthy, acclimatized nursery seedlings</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-green-600" />
                  <span>Delivery available across the country</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-green-600" />
                  <span>Free planting guidance included</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.01]">
              Order Seedling
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
