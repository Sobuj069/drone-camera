import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function FloatingWidgets() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed right-3 sm:right-6 bottom-16 sm:bottom-20 z-40 flex flex-col space-y-2 sm:space-y-3" data-purpose="floating-action-buttons">
            {/* Back to top */}
            {showTop && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#0070d5] transition"
                >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </svg>
                </button>
            )}

            {/* Customer service support avatar */}
            <Link
                href="/contact"
                aria-label="Open support chat"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/95 backdrop-blur-md rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#0070d5] transition overflow-hidden"
                title="Customer Support & Sales Inquiry"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
            </Link>
        </div>
    );
}
