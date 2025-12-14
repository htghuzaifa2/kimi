module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/not-found.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.js [app-rsc] (ecmascript)"));
}),
"[project]/src/data/products.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":1,"title":"Ghost of Yotei Gray Hoodie – Atsu, Wolf & Mount Yotei","slug":"ghost-of-yotei-gray-hoodie-atsu-wolf-mount-yotei","price":3600,"currency":"PKR","brand":"Kimi","categories":["ghost-of-yotei","men"],"images":[{"url":"https://i.postimg.cc/prXDrB2s/premium-grey-hoodie-atsu-wolf.webp","alt":"Ghost of Yotei gray hoodie featuring Atsu, Wolf and Mount Yotei artwork"}],"shortDescription":"Premium gray hoodie with Atsu, Wolf & Mount Yotei artwork. Soft fleece interior, relaxed streetwear fit, durable cotton fabric, and custom size option.","description":"This Ghost of Yotei Gray Hoodie merges Japanese-inspired artwork with modern streetwear aesthetics. The gray tone enhances the detailed graphics of Atsu, the Wolf, and Mount Yotei. Crafted from premium cotton, it offers softness, warmth, and durability while staying breathable for year-round wear. The relaxed yet structured fit maintains a clean silhouette with ribbed cuffs, a reinforced hem, and an adjustable hood. Perfect for layering, casual outfits, or everyday urban looks.","specs":{"fabric":"100% Premium Cotton","interior":"Brushed fleece for added warmth","fit":"Relaxed fit","season":"All-season","print":"High-detail Atsu, Wolf & Mount Yotei artwork","care":"Machine wash cold; tumble dry low; do not bleach","customSizeAvailable":true},"notes":"Manual measurement may vary 1–3cm."},{"id":2,"title":"Ghost of Yotei Pink Hoodie – Atsu & Mount Yotei","slug":"ghost-of-yotei-pink-hoodie-atsu-mount-yotei","price":3600,"currency":"PKR","brand":"Kimi","categories":["ghost-of-yotei","men"],"images":[{"url":"https://i.postimg.cc/g2YnW02T/Ghost-of-Yotei-Pink-Hoodie.webp","alt":"Ghost of Yotei pink hoodie featuring Atsu and Mount Yotei artwork"}],"shortDescription":"Premium pink hoodie featuring Atsu & Mount Yotei artwork. Soft cotton blend, warm and breathable, relaxed fit, perfect for casual wear or collectors.","description":"Step into the mysterious world of Ghost of Yotei with this pink hoodie featuring Atsu and Mount Yotei. Made from a high-quality cotton blend, it provides warmth, durability, and comfort for everyday wear. The detailed artwork highlights the legendary warrior Atsu against the backdrop of Mount Yotei, reflecting Japanese artistry and the iconic samurai spirit. Ideal for casual outfits, gaming sessions, or as a collectible for fans of Ghost of Yotei.","specs":{"fabric":"Premium cotton blend","interior":"Soft and breathable lining","fit":"Relaxed fit","season":"All-season","print":"High-detail Atsu & Mount Yotei artwork","care":"Machine wash cold; tumble dry low; do not bleach","customSizeAvailable":true},"notes":"Manual measurement may vary 1–3cm."}]);}),
"[project]/src/data/products.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Product Data
// Do not remove the exports below, as they are used by the application components.
__turbopack_context__.s([
    "categories",
    ()=>categories,
    "gamingSubCategories",
    ()=>gamingSubCategories,
    "productTypes",
    ()=>productTypes,
    "products",
    ()=>products
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/products.json (json)");
const categories = [
    'Men',
    'Women',
    'Kids',
    'Gaming Outfits',
    'Ghost of Yotei'
];
const gamingSubCategories = [
    'Ghost of Tsushima',
    'God of War',
    'The Last of Us',
    'Elden Ring',
    'Assassin\'s Creed',
    'Ghost of Yotei'
];
const productTypes = [
    'Hoodie',
    'Jacket',
    'Shirt',
    'Pants',
    'Accessories'
];
;
// Helper to normalize strings for comparison
const normalize = (str)=>str?.toLowerCase().replace(/[^a-z0-9]/g, '');
const products = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$json__$28$json$29$__["default"].map((p)=>{
    // 1. Determine Category & SubCategory
    let category = 'Men'; // Default
    let subCategory = null;
    // Check for Gaming SubCategories first
    const gamingMatch = gamingSubCategories.find((g)=>p.categories.some((c)=>normalize(c) === normalize(g)));
    if (gamingMatch) {
        category = 'Gaming Outfits';
        subCategory = gamingMatch;
    } else {
        // Check for main categories
        if (p.categories.some((c)=>normalize(c) === 'women')) category = 'Women';
        else if (p.categories.some((c)=>normalize(c) === 'kids')) category = 'Kids';
        else if (p.categories.some((c)=>normalize(c) === 'men')) category = 'Men';
    }
    // 2. Determine Product Type
    let productType = 'Accessories';
    const typeMatch = productTypes.find((t)=>p.categories.some((c)=>normalize(c).includes(normalize(t))));
    if (typeMatch) productType = typeMatch;
    // 3. Map Fields
    return {
        id: p.id,
        slug: p.slug,
        name: p.title,
        price: p.price,
        category: category,
        subCategory: subCategory,
        productType: productType,
        image: p.images[0]?.url || '',
        images: p.images.map((img)=>img.url),
        description: p.shortDescription || p.description?.substring(0, 150) + '...',
        longDescription: p.description,
        specifications: p.specs,
        stock: p.stock || 50,
        rating: 5,
        meta: p.meta
    };
});
}),
"[project]/src/config/seoConfig.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SEO configuration for all pages
__turbopack_context__.s([
    "seoConfig",
    ()=>seoConfig
]);
const seoConfig = {
    home: {
        title: "Kimi — Wear Without Fear",
        description: "Kimi – Pakistan’s premier clothing brand. Shop the latest collections of authentic ethnic wear, designer apparel, and luxury prêt. Discover stylish, fearless fashion with high-quality fabrics and designs. Worldwide shipping available",
        keywords: "Kimi, custom sizing Pakistan, premium clothing brand, fearless fashion, streetwear Pakistan, gaming outfits, tailored fits, online shopping Pakistan",
        canonicalUrl: "/",
        ogImage: "/favicon.ico"
    },
    contact: {
        title: "Contact Us",
        description: "Need help with custom sizing? Contact Kimi's support team in Pakistan for orders, fits, and inquiries. WhatsApp or email us today.",
        keywords: "contact Kimi, custom sizing help, customer support Pakistan, clothing inquiries",
        canonicalUrl: "/contact",
        ogImage: "/og-contact.jpg"
    },
    about: {
        title: "About Us",
        description: "Kimi is Pakistan's fearless fashion house. We believe in the perfect fit, offering custom sizing and premium quality for those who dare to stand out.",
        keywords: "about Kimi, fashion brand story, custom sizing brand, fearless fashion Pakistan",
        canonicalUrl: "/about",
        ogImage: "/og-about.jpg"
    },
    faq: {
        title: "FAQ",
        description: "Find answers about Kimi's custom sizing, shipping across Pakistan, and return policies. Everything needed for a seamless shopping experience.",
        keywords: "Kimi FAQ, custom size guide, shipping Pakistan, returns policy",
        canonicalUrl: "/faq",
        ogImage: "/og-faq.jpg"
    },
    shipping: {
        title: "Shipping Policy",
        description: "Fast, reliable shipping across Pakistan with Kimi. Free delivery on qualifying orders. Tracking available for all custom and standard shipments.",
        keywords: "shipping Pakistan, fast delivery, Kimi shipping, free delivery Lahore Karachi Islamabad",
        canonicalUrl: "/shipping",
        ogImage: "/og-shipping.jpg"
    },
    returns: {
        title: "Returns & Refunds",
        description: "Hassle-free returns and exchanges. If the fit isn't perfect, we'll make it right. Read Kimi's customer-first return policy.",
        keywords: "returns policy, exchange Pakistan, custom size adjustment, Kimi refunds",
        canonicalUrl: "/returns",
        ogImage: "/og-returns.jpg"
    },
    cod: {
        title: "Cash on Delivery",
        description: "Shop premium fashion confidently. Kimi offers Cash on Delivery (COD) across Pakistan. Inspect your custom fits upon arrival.",
        keywords: "cash on delivery Pakistan, COD shopping, secure payment, Kimi payments",
        canonicalUrl: "/cod",
        ogImage: "/og-cod.jpg"
    },
    checkout: {
        title: "Checkout",
        description: "Complete your order for premium custom-fit clothing. Secure checkout with COD and online payment options. Fast dispatch to all cities.",
        keywords: "checkout, buy clothes Pakistan, secure payment, custom sizing order",
        canonicalUrl: "/checkout",
        ogImage: "/og-checkout.jpg"
    },
    terms: {
        title: "Terms of Service",
        description: "Kimi's terms of service. Transparent policies for custom sizing orders, shipping, and usage. Protecting our valued Pakistani customers.",
        keywords: "terms of service, legal, custom order terms, Kimi policies",
        canonicalUrl: "/terms",
        ogImage: "/og-terms.jpg"
    },
    privacy: {
        title: "Privacy Policy",
        description: "Your privacy matters. Learn how Kimi protects your personal data while providing the best personalized shopping experience in Pakistan.",
        keywords: "privacy policy, data protection Pakistan, secure shopping",
        canonicalUrl: "/privacy",
        ogImage: "/og-privacy.jpg"
    },
    categories: {
        title: "Shop by Collection",
        description: "Explore Kimi's exclusive collections. From gaming gear to streetwear, find your perfect style and fit with our custom sizing options.",
        keywords: "fashion collections, custom fit clothing, shop by category, Kimi designs",
        canonicalUrl: "/collections",
        ogImage: "/og-collections.jpg"
    },
    sizeGuide: {
        title: "Size Guide",
        description: "Not sure about your size? Check our guide or choose Custom Sizing for a tailored fit. The best fit in Pakistan, guaranteed.",
        keywords: "size guide, custom sizing Pakistan, how to measure, tailored fit",
        canonicalUrl: "/size-guide",
        ogImage: "/og-size-guide.jpg"
    },
    compare: {
        title: "Compare Products",
        description: "Compare your favorite Kimi products side-by-side. Analyze features, prices, and styles to make the perfect choice for your custom fit.",
        keywords: "compare clothing, product comparison, Kimi feature compare, price check",
        canonicalUrl: "/compare",
        ogImage: "/favicon.ico"
    },
    search: {
        title: "Search Results",
        description: "Search for your favorite looks, custom sizing options, and premium outfits on Kimi.",
        keywords: "search clothing, find fashion, Kimi search",
        canonicalUrl: "/search",
        ogImage: "/og-search.jpg"
    }
};
}),
"[project]/src/app/collections/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CollectionsPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/products.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/seoConfig.js [app-rsc] (ecmascript)");
;
;
;
;
const metadata = {
    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.title,
    description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.description,
    keywords: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.keywords,
    openGraph: {
        title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.title,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.description,
        url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.canonicalUrl,
        images: [
            {
                url: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.ogImage
            }
        ],
        type: 'website'
    },
    alternates: {
        canonical: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$seoConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["seoConfig"].categories.canonicalUrl
    }
};
function CollectionsPage() {
    const categoriesData = [
        {
            name: 'Men',
            image: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.category === 'Men')?.image || '/placeholder.jpg',
            link: '/shop/men',
            count: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].filter((p)=>p.category === 'Men').length
        },
        {
            name: 'Women',
            image: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.category === 'Women')?.image || '/placeholder.jpg',
            link: '/shop/women',
            count: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].filter((p)=>p.category === 'Women').length
        },
        {
            name: 'Kids',
            image: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.category === 'Kids')?.image || '/placeholder.jpg',
            link: '/shop/kids',
            count: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].filter((p)=>p.category === 'Kids').length
        },
        {
            name: 'Ghost of Yotei',
            image: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.subCategory === 'Ghost of Yotei')?.image || '/placeholder.jpg',
            link: '/shop/ghost-of-yotei',
            count: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].filter((p)=>p.subCategory === 'Ghost of Yotei').length
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "content-page container categories-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content-header text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "h2",
                        children: "Browse Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/app/collections/page.jsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "Explore our wide range of premium collections."
                    }, void 0, false, {
                        fileName: "[project]/src/app/collections/page.jsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/collections/page.jsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "categories-grid",
                children: categoriesData.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: cat.link,
                        className: "category-tile",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-tile-image-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: cat.image,
                                        alt: cat.name,
                                        className: "category-tile-image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/collections/page.jsx",
                                        lineNumber: 45,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "category-tile-overlay"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/collections/page.jsx",
                                        lineNumber: 46,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/collections/page.jsx",
                                lineNumber: 44,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "category-tile-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "category-tile-title",
                                        children: cat.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/collections/page.jsx",
                                        lineNumber: 49,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "category-tile-count",
                                        children: [
                                            cat.count,
                                            " Products"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/collections/page.jsx",
                                        lineNumber: 50,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/collections/page.jsx",
                                lineNumber: 48,
                                columnNumber: 25
                            }, this)
                        ]
                    }, cat.name, true, {
                        fileName: "[project]/src/app/collections/page.jsx",
                        lineNumber: 43,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/collections/page.jsx",
                lineNumber: 41,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/collections/page.jsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/collections/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/collections/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__28ad82af._.js.map