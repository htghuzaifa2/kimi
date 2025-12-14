'use client';

import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { products, gamingSubCategories, productTypes, categories as staticCategories } from '../data/products';
import { useCompare } from '../context/CompareContext';
import { Filter, Scale } from 'lucide-react';

const ShopClient = ({ categoryParam, subCategoryParam }) => {
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    // ... existing hooks ...

    // ... (inside map) ... placeholder removed

    const router = useRouter(); // FIX: Initialize router
    const pathname = usePathname();
    // const searchParams = useSearchParams(); // If we need query params

    const [sortBy, setSortBy] = useState('newest'); // Default & Fixed
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [productTypeFilter, setProductTypeFilter] = useState('All');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Windowed Pagination State
    const ITEMS_PER_PAGE = 24;
    const MAX_PAGES_IN_MEMORY = 3;
    const [visiblePages, setVisiblePages] = useState([1]);
    const [isLoading, setIsLoading] = useState(false);

    // Refs for scroll maintenance
    const containerRef = useRef(null);
    const previousScrollHeightRef = useRef(0);

    // Use static categories combined with "All", Explicitly defining UI categories
    // Removed "Gaming Outfits", Added "Ghost of Yotei"
    const categories = useMemo(() => ['All', 'Men', 'Women', 'Kids', 'Ghost of Yotei'], []);

    // Initialize from Params
    useEffect(() => {
        if (categoryParam) {
            // Format category name
            const formattedCategory = categoryParam.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            setActiveCategory(formattedCategory);

            // Should be null unless valid sub-category logic handling is added back
            setActiveSubCategory(null);
        } else {
            setActiveCategory('All');
            setActiveSubCategory(null);
        }

        setVisiblePages([1]);
        setProductTypeFilter('All');
    }, [categoryParam, subCategoryParam]);

    // Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Identify active category
        if (activeCategory === 'Ghost of Yotei') {
            // Special handling for this "Game" as a main category
            result = result.filter(p => p.subCategory === 'Ghost of Yotei');
        } else if (activeCategory !== 'All') {
            // Normal Category Filter (Men, Women, Kids)
            result = result.filter(p => p.category === activeCategory);
        }

        // Filter by Product Type
        if (productTypeFilter !== 'All') {
            result = result.filter(p => p.productType === productTypeFilter);
        }

        // Sort
        switch (sortBy) {
            case 'price-low-high':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'oldest':
                result.sort((a, b) => a.id - b.id);
                break;
            case 'newest':
            default:
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [activeCategory, productTypeFilter, sortBy]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (visiblePages[0] !== 1 || visiblePages.length > 1) {
            setVisiblePages([1]);
        }
    }, [activeCategory, productTypeFilter, sortBy]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    // Get products for visible pages
    const visibleProducts = useMemo(() => {
        const minPage = Math.min(...visiblePages);
        const maxPage = Math.max(...visiblePages);
        const startIndex = (minPage - 1) * ITEMS_PER_PAGE;
        const endIndex = maxPage * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [visiblePages, filteredProducts]);

    const handleLoadMore = () => {
        const maxPage = Math.max(...visiblePages);
        if (maxPage >= totalPages || isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            setVisiblePages(prev => {
                const newPages = [...prev, maxPage + 1];
                if (newPages.length > MAX_PAGES_IN_MEMORY) {
                    newPages.shift();
                }
                return newPages;
            });
            setIsLoading(false);
        }, 500);
    };

    const handleLoadPrevious = () => {
        const minPage = Math.min(...visiblePages);
        if (minPage <= 1 || isLoading) return;
        setIsLoading(true);
        previousScrollHeightRef.current = containerRef.current?.scrollHeight || 0;
        setTimeout(() => {
            setVisiblePages(prev => {
                const newPages = [minPage - 1, ...prev];
                if (newPages.length > MAX_PAGES_IN_MEMORY) {
                    newPages.pop();
                }
                return newPages;
            });
            setIsLoading(false);
        }, 500);
    };

    // Scroll Maintenance for Load Previous
    useLayoutEffect(() => {
        if (isLoading) return;
        const currentScrollHeight = containerRef.current?.scrollHeight || 0;
        const scrollDiff = currentScrollHeight - previousScrollHeightRef.current;
        if (scrollDiff > 0 && previousScrollHeightRef.current > 0) {
            window.scrollBy(0, scrollDiff);
            previousScrollHeightRef.current = 0;
        }
    }, [visiblePages, isLoading]);

    const minPage = Math.min(...visiblePages);
    const maxPage = Math.max(...visiblePages);

    return (
        <div className="shop-container container" ref={containerRef}>
            {/* Category Header (Title Only - Pills Removed) */}
            <div className="category-header">
                <h1 className="h2 mb-6">{activeCategory}</h1>
            </div>

            <div className="shop-layout-single-col">
                {/* Top Filter Bar - Sort & Product Type */}
                <div className="shop-toolbar mb-8" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="toolbar-group">
                        <label className="toolbar-label">Sort By:</label>
                        <select
                            className="toolbar-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Latest (New to Old)</option>
                            <option value="oldest">Oldest (Old to New)</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>

                    {activeCategory !== 'All' /* Show Product Type Filter if needed, or always? Keeping logical */ && (
                        <div className="toolbar-group">
                            <label className="toolbar-label">Product Type:</label>
                            <select
                                className="toolbar-select"
                                value={productTypeFilter}
                                onChange={(e) => setProductTypeFilter(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                {productTypes.map(type => (
                                    <option key={type} value={type}>{type}s</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Product Grid & Pagination */}
                <main className="shop-main">
                    {/* Load Previous Button */}
                    {minPage > 1 && (
                        <div className="pagination-container" style={{ marginTop: 0, marginBottom: '30px' }}>
                            <button
                                className="btn btn-outline"
                                onClick={handleLoadPrevious}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Load Previous Products'}
                            </button>
                        </div>
                    )}

                    <div className="product-grid">
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="product-card fade-in">
                                <Link href={`/product/${product.slug}`} className="product-image-wrapper">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-overlay">
                                        <button className="btn btn-secondary quick-view-btn">View Details</button>
                                        <button
                                            className={`btn btn-icon ${isInCompare(product.id) ? 'bg-primary text-white' : 'bg-white text-black'}`}
                                            style={{ marginTop: '8px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (isInCompare(product.id)) {
                                                    removeFromCompare(product.id);
                                                } else {
                                                    addToCompare(product);
                                                }
                                            }}
                                            title={isInCompare(product.id) ? "Remove from Compare" : "Add to Compare"}
                                        >
                                            <Scale size={20} />
                                        </button>
                                    </div>
                                </Link>
                                <div className="product-info">
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: '500', marginBottom: '4px', display: 'block' }}>
                                        ID: {product.id}
                                    </span>
                                    <Link href={`/product/${product.slug}`} className="product-title">{product.name}</Link>
                                    <div className="product-meta">
                                        <span className="product-price">PKR {product.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {maxPage < totalPages && (
                        <div className="pagination-container">
                            <button
                                className="btn btn-outline"
                                onClick={handleLoadMore}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Load More Products'}
                            </button>
                        </div>
                    )}
                </main>
            </div >
        </div >
    );
};

export default ShopClient;
