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
"[project]/src/components/ProductClient.jsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/ProductClient.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ProductClient.jsx <module evaluation>", "default");
}),
"[project]/src/components/ProductClient.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/ProductClient.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ProductClient.jsx", "default");
}),
"[project]/src/components/ProductClient.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ProductClient.jsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/ProductClient.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/product/[slug]/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/products.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductClient.jsx [app-rsc] (ecmascript)");
;
;
;
async function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].map((product)=>({
            slug: product.slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.slug === slug);
    if (!product) {
        return {
            title: "Product Not Found | Kimi",
            description: "The product you are looking for does not exist."
        };
    }
    // Generate a strong, sales-focused description limited to 155 chars
    const productDesc = (product.longDescription || product.description || "").substring(0, 80).trim();
    const description = `${productDesc}... Shop this custom style at Kimi. Premium fit & quality in Pakistan.`.substring(0, 155);
    return {
        title: product.name,
        description: description,
        keywords: `${product.name}, custom sizing, Kimi clothing, Pakistan fashion, buy ${product.category.toLowerCase()} online, tailored fit`,
        alternates: {
            canonical: `/product/${product.slug}`
        },
        openGraph: {
            title: product.name,
            description: description,
            url: `/product/${product.slug}`,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 600,
                    alt: product.name
                }
            ],
            type: 'website',
            siteName: 'Kimi Fashion Store'
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: description,
            images: [
                product.image
            ]
        }
    };
}
async function ProductPage({ params }) {
    const { slug } = await params;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        slug: slug
    }, void 0, false, {
        fileName: "[project]/src/app/product/[slug]/page.jsx",
        lineNumber: 59,
        columnNumber: 12
    }, this);
}
}),
"[project]/src/app/product/[slug]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/product/[slug]/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ce344de2._.js.map