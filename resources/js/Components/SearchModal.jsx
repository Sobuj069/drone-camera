import React, { useState, useEffect } from 'react';
import { Search, X, ChevronRight, Drone, ExternalLink } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) onClose();
                else onClose(false); // toggle trigger
            }
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onClose();
            router.get('/products', { search: query });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl z-10"
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                                <Search className="w-5 h-5 text-[#707473] mr-3 shrink-0" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search drones, gimbals, camera systems, manuals..."
                                    autoFocus
                                    className="w-full bg-transparent text-[#101418] placeholder-gray-400 focus:outline-none text-lg font-medium"
                                />
                            </form>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Popular Quick Searches */}
                        <div className="mt-6">
                            <p className="text-xs font-semibold text-[#707473] uppercase tracking-wider mb-3">
                                Popular Searches
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                    { name: 'AERO Mavic 4 Pro (Flagship 3D)', href: '/products/aero-mavic-4-pro' },
                                    { name: 'AERO Neo 360 Vlog Drone', href: '/products/aero-neo-360' },
                                    { name: 'AERO Osmo Mobile 8 Gimbal', href: '/products/aero-osmo-mobile-8' },
                                    { name: 'AERO Inspire Cinema 3 8K', href: '/products/aero-inspire-cinema-3' },
                                    { name: 'Drone Comparison Matrix', href: '/compare' },
                                    { name: 'Fly Safe & GEO Regulations', href: '/support' },
                                ].map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center justify-between p-3 rounded-xl bg-[#f5f6f8] hover:bg-blue-50 text-sm text-[#212121] hover:text-[#0070d5] border border-gray-100 hover:border-blue-200 transition-all group font-medium"
                                    >
                                        <span>{item.name}</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#0070d5] transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Footer tip */}
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#707473]">
                            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-700 font-mono">ESC</kbd> to close</span>
                            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-700 font-mono">ENTER</kbd> to search catalog</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
