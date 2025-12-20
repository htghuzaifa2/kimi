import { products } from '../../../data/products';
import ProductClient from '../../../components/ProductClient';

// Required for static export - pre-generate all product slugs
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | Kimi",
            description: "The product you are looking for does not exist.",
        };
    }

    // Handle new schema vs old schema
    const title = product.title || product.name;
    const imageUrl = product.images && product.images.length > 0
        ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url)
        : product.image;

    const category = product.categories && product.categories.length > 0
        ? product.categories[0]
        : product.category || 'Apparel';

    // Generate a strong, sales-focused description limited to 155 chars
    const productDesc = (product.shortDescription || product.longDescription || product.description || "").substring(0, 80).trim();
    const description = `${productDesc}... Shop this custom style at Kimi. Premium fit & quality in Pakistan.`.substring(0, 155);

    return {
        title: title,
        description: description, // Optimized for CTR and Keywords
        keywords: `${title}, custom sizing, Kimi clothing, Pakistan fashion, buy ${category.toLowerCase()} online, tailored fit`,
        alternates: {
            canonical: `/product/${product.slug}`,
        },
        openGraph: {
            title: title,
            description: description,
            url: `/product/${product.slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                }
            ],
            type: 'website',
            siteName: 'Kimi Fashion Store',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [imageUrl],
        }
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    return <ProductClient slug={slug} />;
}
