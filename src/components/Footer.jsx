import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log('Subscribed with:', email);
        alert('Thank you for subscribing!');
        setEmail('');
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-col brand-col">
                        <Link href="/" className="footer-logo">KIMI</Link>
                        <p className="footer-desc">
                            Redefining fashion with boldness and elegance. Premium clothing for the modern individual.
                        </p>

                    </div>

                    {/* Shop Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Shop</h4>
                        <ul className="footer-links">
                            <li><Link href="/shop">All Products</Link></li>
                            <li><Link href="/shop?sort=newest">New Arrivals</Link></li>
                            <li><Link href="/shop?category=Men">Men</Link></li>
                            <li><Link href="/shop?category=Women">Women</Link></li>
                            <li><Link href="/collections">Collections</Link></li>
                            <li><Link href="/lookbook">Lookbook</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/shipping">Shipping Policy</Link></li>
                            <li><Link href="/returns">Returns & Exchange</Link></li>
                            <li><Link href="/faq">FAQs</Link></li>
                            <li><Link href="/cod">Cash on Delivery</Link></li>
                            <li><Link href="/size-guide">Size Guide</Link></li>
                            <li><Link href="/compare">Compare Products</Link></li>
                        </ul>
                    </div>


                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} KIMI. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
