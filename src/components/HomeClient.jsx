'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import Link from 'next/link';
import { products } from '../data/products';
// import '../pages/Home.css'; // Moved to layout.jsx

const HomeClient = () => {
    const [displayProducts, setDisplayProducts] = useState([]);
    const [showLoadPrevious, setShowLoadPrevious] = useState(false);

    const masterListRef = useRef([]);
    const visibleWindowRef = useRef({ start: 0, end: 0 });
    const loadingRef = useRef(false);
    const observerRef = useRef(null);
    const loadingIndicatorRef = useRef(null);
    const scrollPreserveRef = useRef({ isPrepending: false, previousHeight: 0 });

    const BATCH_SIZE = 24;
    const MAX_VISIBLE_ITEMS = 72;

    const [hasMore, setHasMore] = useState(true);

    const updateDisplay = () => {
        const { start, end } = visibleWindowRef.current;
        const slice = masterListRef.current.slice(start, end);
        setDisplayProducts(slice);
        setShowLoadPrevious(start > 0);
        setHasMore(end < masterListRef.current.length);
    };

    useEffect(() => {
        if (!products || !Array.isArray(products)) return;

        // Shuffle once on init
        const shuffled = [...products].sort(() => 0.5 - Math.random());

        // Add unique key just in case, but maintain 1-to-1 mapping
        const prepareProducts = shuffled.map(p => ({
            ...p,
            uniqueKey: `${p.id}-${Date.now()}-${Math.random()}`
        }));

        masterListRef.current = prepareProducts;

        // Initial window
        const initialCount = Math.min(BATCH_SIZE, prepareProducts.length);
        visibleWindowRef.current = { start: 0, end: initialCount };
        updateDisplay();
    }, []);

    useLayoutEffect(() => {
        if (scrollPreserveRef.current.isPrepending) {
            const newHeight = document.documentElement.scrollHeight;
            const diff = newHeight - scrollPreserveRef.current.previousHeight;
            window.scrollBy(0, diff);
            scrollPreserveRef.current.isPrepending = false;
        }
    }, [displayProducts]);

    const loadMore = useCallback(() => {
        if (loadingRef.current) return;

        const totalItems = masterListRef.current.length;
        const { end } = visibleWindowRef.current;

        // Stop if we've shown all products
        if (end >= totalItems) return;

        loadingRef.current = true;

        setTimeout(() => {
            try {
                let { start, currentEnd } = visibleWindowRef.current;

                // Just extend the window, don't create new items
                let newEnd = end + BATCH_SIZE;
                if (newEnd > totalItems) newEnd = totalItems;

                if (newEnd - start > MAX_VISIBLE_ITEMS) {
                    start = newEnd - MAX_VISIBLE_ITEMS;
                }

                visibleWindowRef.current = { start, end: newEnd };
                updateDisplay();
            } catch (error) {
                console.error("Error loading more products:", error);
            } finally {
                loadingRef.current = false;
            }
        }, 500);
    }, []);

    const loadPrevious = () => {
        scrollPreserveRef.current = {
            isPrepending: true,
            previousHeight: document.documentElement.scrollHeight
        };

        let { start, end } = visibleWindowRef.current;
        const newStart = Math.max(0, start - BATCH_SIZE);

        visibleWindowRef.current = { start: newStart, end };
        updateDisplay();
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        observerRef.current = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasMore) { // Only load more if hasMore is true
                loadMore();
            }
        }, options);

        if (loadingIndicatorRef.current && hasMore) { // Only observe if there's more to load
            observerRef.current.observe(loadingIndicatorRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMore, hasMore]); // Add hasMore dependency to re-observe if it reappears

    const mainCategories = [
        { id: 'men', name: 'Men', image: 'https://i.postimg.cc/prXDrB2s/premium-grey-hoodie-atsu-wolf.webp', link: '/shop/Men' },
        { id: 'women', name: 'Women', image: 'https://i.postimg.cc/g2YnW02T/Ghost-of-Yotei-Pink-Hoodie.webp', link: '/shop/Women' },
        { id: 'kids', name: 'Kids', image: 'https://i.postimg.cc/prXDrB2s/premium-grey-hoodie-atsu-wolf.webp', link: '/shop/Kids' },
        { id: 'hoodies', name: 'Hoodies', image: 'https://i.postimg.cc/g2YnW02T/Ghost-of-Yotei-Pink-Hoodie.webp', link: '/shop/Hoodies' },
        { id: 'jackets', name: 'Jackets', image: 'https://i.postimg.cc/prXDrB2s/premium-grey-hoodie-atsu-wolf.webp', link: '/shop/Jackets' }
    ];

    const gamingCollections = [
        { id: 'ghost-of-yotei', name: 'Ghost of Yotei', image: 'https://i.postimg.cc/prXDrB2s/premium-grey-hoodie-atsu-wolf.webp', link: '/shop/Gaming%20Outfits/Ghost%20of%20Yotei' }
    ];

    if (!products || !Array.isArray(products)) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Error loading products.</div>;
    }

    return (
        <div className="home-page">
            {/* Hero Section Restored */}
            <section className="hero">
                <div className="hero-content fade-in-up">
                    <h1 className="h1 hero-title">Wear Without Fear</h1>
                    <p className="hero-subtitle">Pakistan's premier fashion destination. Authentic style, tailored for you.</p>
                    <div className="hero-actions">
                        <Link href="/collections" className="btn btn-primary">Shop Collection</Link>
                        <button className="btn btn-outline">View Lookbook</button>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="section container" style={{ marginTop: '4rem' }}>
                <div className="section-header text-center mb-10">
                    <h2 className="h2 section-title">Featured Products</h2>
                    <div className="section-divider mx-auto"></div>
                    <p className="section-subtitle text-muted">Premium quality, designed for the bold.</p>
                </div>

                {showLoadPrevious && (
                    <div className="text-center mb-8">
                        <button onClick={loadPrevious} className="btn btn-outline load-prev-btn">
                            Load Previous Products
                        </button>
                    </div>
                )}

                <div className="product-grid">
                    {displayProducts.map((product) => (
                        <div key={product.uniqueKey} className="product-card">
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <div className="loading-indicator" ref={loadingIndicatorRef}>
                        <div className="spinner"></div>
                        <p>Loading products...</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomeClient;
