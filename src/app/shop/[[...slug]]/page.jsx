import { seoConfig } from '../../../config/seoConfig';
import ShopClient from '../../../components/ShopClient';
import { categories, gamingSubCategories } from '../../../data/products';

// Required for static export - pre-generate all shop routes
export async function generateStaticParams() {
    const params = [];

    // Base /shop route
    params.push({ slug: [] });

    // Category routes
    categories.forEach(cat => {
        const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
        params.push({ slug: [catSlug] });
    });

    // Product type routes (hoodies, jackets, etc.)
    params.push({ slug: ['hoodies'] });
    params.push({ slug: ['jackets'] });

    // Gaming subcategory routes
    gamingSubCategories.forEach(sub => {
        const subSlug = sub.toLowerCase().replace(/\s+/g, '-');
        params.push({ slug: ['gaming-outfits', subSlug] });
    });

    return params;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const category = slug?.[0];
    const subCategory = slug?.[1];

    let title = seoConfig.shop?.title || "Shop | Kimi";
    let description = seoConfig.shop?.description || "Browse our latest collections.";
    let keywords = seoConfig.shop?.keywords || "";

    const formatName = (str) => {
        if (!str) return '';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const formattedCategory = formatName(category);
    const formattedSubCategory = formatName(subCategory);

    if (category) {
        if (formattedCategory === 'All') {
            title = seoConfig.shop?.title || title;
            description = seoConfig.shop?.description || description;
        } else {
            title = `Shop ${formattedCategory} Clothing Collection`;
            description = `Shop premium ${formattedCategory.toLowerCase()} at Kimi. We offer custom sizing, superior fabric quality, and fast delivery across Pakistan. The best choice for fearless fashion.`;
        }
    }

    if (subCategory) {
        title = `Shop ${formattedSubCategory} ${formattedCategory} Online`;
        description = `Get exclusive ${formattedSubCategory} ${formattedCategory.toLowerCase()} with custom sizing options. Official gaming merchandise by Kimi, delivered anywhere in Pakistan.`;
    }

    if (category || subCategory) {
        keywords = `${formattedCategory.toLowerCase()}, custom sizing, pakistan fashion, ${subCategory ? formattedSubCategory.toLowerCase() + ',' : ''} ${keywords}`;
    }

    let canonicalPath = '/shop';
    if (category) canonicalPath += `/${category}`;
    if (subCategory) canonicalPath += `/${subCategory}`;

    // Use absolute title to prevent "Shop | Kimi - Kimi" duplication
    const finalTitle = title.includes('| Kimi') || title.includes('- Kimi') ? title : `${title} | Kimi`;

    return {
        title: {
            absolute: finalTitle
        },
        description,
        keywords,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            images: [
                {
                    url: seoConfig.shop?.ogImage || '/favicon.ico', // Fallback
                }
            ],
            type: 'website',
            siteName: 'Kimi Fashion Store',
        }
    };
}

export default async function ShopPage({ params }) {
    const { slug } = await params;
    const category = slug?.[0];
    const subCategory = slug?.[1];

    return <ShopClient categoryParam={category} subCategoryParam={subCategory} />;
}
