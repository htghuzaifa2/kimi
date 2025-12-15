'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';
import { products } from '../data/products';
import '../styles/Shop.css'; // Import global shop styles for product cards

// We need a wrapper component for Suspense too if we were to export it directly, but let's do the logic here.
const SearchClient = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [query, setQuery] = useState(q || '');

    useEffect(() => {
        if (q) {
            setQuery(q);
        }
    }, [q]);

    const results = useMemo(() => {
        if (!query.trim()) return [];

        const normalizedQuery = query.toLowerCase().trim();
        const words = normalizedQuery.split(/\s+/);
        const isNumericSearch = /^\d+$/.test(normalizedQuery);

        // Priority 0: Exact ID match
        if (isNumericSearch) {
            const idMatches = products.filter(p => p.id.toString() === normalizedQuery);
            if (idMatches.length > 0) return idMatches;
        }

        // Priority 1: Partial ID match
        let idPartialMatches = [];
        if (isNumericSearch) {
            idPartialMatches = products.filter(p => p.id.toString().includes(normalizedQuery));
        }

        // Priority 2: First word exact match
        let firstWordMatches = products.filter(p => {
            const name = p.name.toLowerCase();
            const nameWords = name.split(/\s+/);
            return nameWords.some(word => word.startsWith(words[0]));
        });

        // Priority 3: Any word exact match
        let anyWordMatches = products.filter(p => {
            const name = p.name.toLowerCase();
            return words.every(queryWord =>
                name.split(/\s+/).some(nameWord => nameWord.startsWith(queryWord))
            );
        });

        // Priority 4: Fuzzy match
        let fuzzyMatches = products.filter(p => {
            const searchableText = `${p.name} ${p.category} ${p.subCategory || ''} ${p.productType}`.toLowerCase();
            return words.some(word => searchableText.includes(word));
        });

        // Combine results
        const allMatches = [
            ...idPartialMatches,
            ...firstWordMatches.filter(p => !idPartialMatches.find(m => m.id === p.id)),
            ...anyWordMatches.filter(p =>
                !idPartialMatches.find(m => m.id === p.id) &&
                !firstWordMatches.find(m => m.id === p.id)
            ),
            ...fuzzyMatches.filter(p =>
                !idPartialMatches.find(m => m.id === p.id) &&
                !firstWordMatches.find(m => m.id === p.id) &&
                !anyWordMatches.find(m => m.id === p.id)
            )
        ];

        return allMatches;
    }, [query]);

    // Update query manually and push to URL
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // In Next.js App router, we might want to push to URL or just update local state if we want instant feedback?
            // The original code updated search params.
            window.history.pushState(null, '', `?q=${encodeURIComponent(query.trim())}`);
            // But we already have local state `query` so results update instantly.
            // However, to keep URL in sync, we use history API or router.push (which triggers navigation).
            // router.push is better.
        }
    };

    // Actually, let's stick to updating state and optional URL sync.
    // Or better, make it driven by URL state to support back button properly?
    // The original uses useSearchParams which comes from URL.
    // If we type in input, we update `query` state.
    // If we submit, we update URL.

    return (
        <div className="search-results-page">
            <div className="container">
                <div className="search-page-header">
                    <h1 className="h2">Search Products</h1>

                    <form onSubmit={(e) => { e.preventDefault(); window.history.pushState(null, '', `?q=${encodeURIComponent(query.trim())}`); }} className="search-page-form">
                        <div className="search-page-input-wrapper">
                            <SearchIcon size={20} className="search-page-icon" />
                            <input
                                type="text"
                                className="search-page-input"
                                placeholder="Search by name, category, or ID..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="search-page-clear"
                                    onClick={() => { setQuery(''); window.history.pushState(null, '', `?q=`); }}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>

                {query && (
                    <div className="search-results-info">
                        <p>
                            {results.length > 0
                                ? `Found ${results.length} ${results.length === 1 ? 'product' : 'products'} for "${query}"`
                                : `No products found for "${query}"`
                            }
                        </p>
                    </div>
                )}

                {!query && (
                    <div className="search-hints-page">
                        <p className="text-muted">Start typing to search for products...</p>
                        <div className="search-suggestions">
                            <span>Try: "hoodie" or ID like "1", "2", "3"</span>
                        </div>
                    </div>
                )}

                {results.length > 0 && (
                    <div className="product-grid">
                        {results.map((product) => (
                            <div key={product.id} className="product-card">
                                <Link href={`/product/${product.slug}`} className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-overlay">
                                        <button className="btn btn-secondary quick-view-btn">View Details</button>
                                    </div>
                                </Link>
                                <div className="product-info">
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: '500', marginBottom: '4px', display: 'block' }}>
                                        ID: {product.id}
                                    </span>
                                    <Link href={`/product/${product.slug}`} className="product-title">{product.name}</Link>
                                    <div className="product-meta">
                                        <span className="product-price">PKR {product.price.toLocaleString()}</span>
                                        <div className="product-rating">★★★★★</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchClient;
