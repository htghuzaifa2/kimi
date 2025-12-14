import Link from 'next/link';
import { products } from '../../data/products';
import { seoConfig } from '../../config/seoConfig';
// import '../pages/Categories.css';

export const metadata = {
    title: seoConfig.categories.title,
    description: seoConfig.categories.description,
    keywords: seoConfig.categories.keywords,
    openGraph: {
        title: seoConfig.categories.title,
        description: seoConfig.categories.description,
        url: seoConfig.categories.canonicalUrl,
        images: [
            {
                url: seoConfig.categories.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.categories.canonicalUrl,
    },
};

export default function CollectionsPage() {
    const categoriesData = [
        { name: 'Men', image: products.find(p => p.category === 'Men')?.image || '/placeholder.jpg', link: '/shop/men', count: products.filter(p => p.category === 'Men').length },
        { name: 'Women', image: products.find(p => p.category === 'Women')?.image || '/placeholder.jpg', link: '/shop/women', count: products.filter(p => p.category === 'Women').length },
        { name: 'Kids', image: products.find(p => p.category === 'Kids')?.image || '/placeholder.jpg', link: '/shop/kids', count: products.filter(p => p.category === 'Kids').length },
        { name: 'Ghost of Yotei', image: products.find(p => p.subCategory === 'Ghost of Yotei')?.image || '/placeholder.jpg', link: '/shop/ghost-of-yotei', count: products.filter(p => p.subCategory === 'Ghost of Yotei').length },
    ];

    return (
        <div className="content-page container categories-page">
            <div className="content-header text-center">
                <h1 className="h2">Browse Categories</h1>
                <p className="text-muted">Explore our wide range of premium collections.</p>
            </div>

            <div className="categories-grid">
                {categoriesData.map((cat) => (
                    <Link href={cat.link} key={cat.name} className="category-tile">
                        <div className="category-tile-image-wrapper">
                            <img src={cat.image} alt={cat.name} className="category-tile-image" />
                            <div className="category-tile-overlay"></div>
                        </div>
                        <div className="category-tile-content">
                            <h3 className="category-tile-title">{cat.name}</h3>
                            <span className="category-tile-count">{cat.count} Products</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
