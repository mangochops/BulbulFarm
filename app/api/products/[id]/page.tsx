import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bulbulfarm.co.ke';
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.commonName} (${product.binomialName})`,
    image: [product.image],
    description: product.description,
    sku: `PRODUCT-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Bulbul Farm',
    },
    offers: {
      '@type': 'Offer',
      url: `https://bulbulfarm.co.ke/products/${product.id}`,
      priceCurrency: 'KES',
      price: numericPrice,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{product.commonName}</h1>
        <p className="italic text-green-700">{product.binomialName}</p>
        {product.image && (
          <div className="relative w-full h-80 my-4">
            <Image
              src={product.image}
              alt={product.commonName}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <p className="mt-2 text-gray-700">{product.description}</p>
        <p className="text-2xl font-bold text-green-800 mt-4">{product.price}</p>
      </main>
    </>
  );
}
