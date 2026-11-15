import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import { siteConfig } from '@/data/config';
import { ProductDetail } from '@/components/shop/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Produk Tidak Ditemukan' };
  return {
    title: product.name,
    description: `${product.name} — ${product.package}, ${product.duration}. ${product.description}`,
    openGraph: {
      type: 'website',
      title: `${product.name} — ${siteConfig.brand}`,
      description: `${product.package} • ${product.duration}`,
      images: [{ url: product.logo }],
    },
    alternates: { canonical: `/shop/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <ProductDetail product={product} />
    </section>
  );
}
