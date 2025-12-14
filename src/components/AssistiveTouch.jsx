'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, Circle, ShoppingBag, Package, Sparkles, Gem, HelpCircle, Truck, RefreshCw, Banknote, Mail, Info, FileText, ShieldCheck, Scale } from 'lucide-react';
import './AssistiveTouch.css';

const AssistiveTouch = () => {
    const router = useRouter();
    const pathname = usePathname();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial state 0 to prevent hydration mismatch, update in useEffect
    const [isDragging, setIsDragging] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [radius, setRadius] = useState(140);

    // Refs
    const dragStartPos = useRef({ x: 0, y: 0 });
    const dragStartTime = useRef(0);
    const idleTimer = useRef(null);
    const isInteractingWithMenu = useRef(false);
    const animationFrame = useRef(null);

    // Constants
    const DRAG_THRESHOLD = 5;
    const CLICK_TIMEOUT = 200;
    const ANGLE_STEP = 360 / 14; // Fixed angle for 14 items

    // Menu Items (Text Only)
    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'All Products', path: '/shop' },
        { label: 'New Arrivals', path: '/shop' },
        { label: 'Accessories', path: '/collections' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Shipping', path: '/shipping' },
        { label: 'Returns', path: '/returns' },
        { label: 'COD', path: '/cod' },
        { label: 'Contact', path: '/contact' },
        { label: 'About', path: '/about' },
        { label: 'Compare', path: '/compare' },
        { label: 'Terms', path: '/terms' },
        { label: 'Privacy', path: '/privacy' },
    ];

    // --- Idle Timer ---
    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            if (!isOpen && !isDragging && !isInteractingWithMenu.current) setIsIdle(true);
        }, 2000); // 2 seconds as requested
    };

    useEffect(() => {
        // Set initial position on client only
        setPosition({ x: window.innerWidth - 70, y: window.innerHeight - 140 });
        // Radius matches CSS ring sizes
        setRadius(window.innerWidth < 480 ? 120 : window.innerWidth < 768 ? 140 : 170);
    }, []);

    useEffect(() => {
        resetIdleTimer();
        // REMOVED: window.addEventListener('pointerdown', resetIdleTimer);
        // REMOVED: window.addEventListener('pointermove', resetIdleTimer);
        return () => {
            if (idleTimer.current) clearTimeout(idleTimer.current);
            // window.removeEventListener('pointerdown', resetIdleTimer);
            // window.removeEventListener('pointermove', resetIdleTimer);
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [isOpen, isDragging]);

    // --- Window Resize & Route Change ---
    useEffect(() => {
        const handleResize = () => {
            // Radius matches CSS ring sizes
            const width = window.innerWidth;
            setRadius(width < 480 ? 120 : width < 768 ? 140 : 170);

            setPosition(prev => ({
                x: Math.min(prev.x, window.innerWidth - 60),
                y: Math.min(prev.y, window.innerHeight - 60)
            }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // --- Ball Drag Logic (PointerEvents) ---
    const handlePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        dragStartTime.current = Date.now();

        e.target.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!e.buttons) return;

        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        if (!isDragging && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
            setIsDragging(true);
        }

        if (isDragging) {
            const newX = position.x + deltaX;
            const newY = position.y + deltaY;

            const maxX = window.innerWidth - 55;
            const maxY = window.innerHeight - 55;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });

            dragStartPos.current = { x: e.clientX, y: e.clientY };
        }
        resetIdleTimer();
    };

    const handlePointerUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.releasePointerCapture(e.pointerId);

        const duration = Date.now() - dragStartTime.current;
        if (!isDragging && duration < CLICK_TIMEOUT) {
            setIsOpen(prev => !prev);
        }

        setTimeout(() => setIsDragging(false), 50);
        resetIdleTimer();
    };

    // Helper for static circular positioning
    const getItemStyle = (index) => {
        const currentAngle = index * ANGLE_STEP; // Static angle, no rotation
        const radian = currentAngle * (Math.PI / 180);

        // Staggered delay for "Pop out" effect
        const delay = isOpen ? `${index * 0.03}s` : '0s';

        return {
            transform: `translate(${Math.cos(radian) * radius}px, ${Math.sin(radian) * radius}px)`,
            transitionProperty: 'transform, opacity',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease-out',
            transitionDelay: delay
        };
    };

    if (position.x === 0 && position.y === 0) return null; // Prevent hydration mismatch flash

    return (
        <>
            {isOpen && <div className="assistive-overlay" onClick={() => setIsOpen(false)} />}

            <div
                className={`assistive-container ${isOpen ? 'open' : ''} ${isIdle ? 'idle' : ''}`}
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                {/* The Ball - Unique 4-dot grid icon */}
                <div
                    className="assistive-ball"
                    onPointerDown={(e) => { handlePointerDown(e); resetIdleTimer(); }}
                    onPointerMove={(e) => { handlePointerMove(e); resetIdleTimer(); }}
                    onPointerUp={(e) => { handlePointerUp(e); resetIdleTimer(); }}
                    onPointerCancel={(e) => { handlePointerUp(e); resetIdleTimer(); }}
                    onClick={resetIdleTimer} // Additional safety
                >
                    <div className="assistive-ball-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <X size={20} color="white" strokeWidth={2.5} />
                </div>

                {/* The Menu Ring - Static (no rotation) */}
                <div className={`assistive-ring ${isOpen ? 'visible' : ''}`}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className="assistive-item"
                            style={getItemStyle(index)}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="assistive-item-label">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AssistiveTouch;
