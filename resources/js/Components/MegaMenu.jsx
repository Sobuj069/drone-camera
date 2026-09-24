import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MegaMenu({ category, isOpen, onClose }) {
    if (!isOpen || !category) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onMouseLeave={onClose}
                className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl border-b border-gray-200 shadow-2xl py-8 px-6 z-50 text-[#101418]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#101418] tracking-tight flex items-center gap-2">
                                <span>{category.name}</span>
                                {category.tagline && (
                                    <span className="text-xs font-normal text-[#707473]">
                                        — {category.tagline}
                                    </span>
                                )}
                            </h3>
                        </div>
                        <Link
                            href={`/products?category=${category.slug}`}
                            onClick={onClose}
                            className="text-xs font-semibold text-[#0070d5] hover:text-[#005bb5] inline-flex items-center gap-1 group transition-colors"
                        >
                            <span>View All {category.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {category.products && category.products.length > 0 ? (
                            category.products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    onClick={onClose}
                                    className="group flex flex-col rounded-2xl bg-[#f5f6f8] hover:bg-white p-4 transition-all duration-300 border border-gray-100 hover:border-blue-400 hover:shadow-lg"
                                >
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-white flex items-center justify-center border border-gray-100">
                                        {product.thumbnail_url ? (
                                            <img
                                                src={product.thumbnail_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-gray-400 font-mono text-xs">No Preview</div>
                                        )}
                                        {product.badge && (
                                            <span className="absolute top-2 left-2 bg-[#0070d5] text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-sm font-semibold text-[#101418] group-hover:text-[#0070d5] transition-colors">
                                        {product.name}
                                    </h4>
                                    {product.tagline && (
                                        <p className="text-xs text-[#707473] line-clamp-1 mt-0.5">
                                            {product.tagline}
                                        </p>
                                    )}
                                    <div className="mt-auto pt-3 flex items-center justify-between text-xs">
                                        <span className="font-bold text-[#101418]">
                                            ${Number(product.price).toLocaleString()}
                                        </span>
                                        <span className="text-[#0070d5] font-medium inline-flex items-center group-hover:translate-x-0.5 transition-transform">
                                            <span>Explore</span>
                                            <ChevronRight className="w-3 h-3 ml-0.5" />
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-4 py-8 text-center text-[#707473] text-sm">
                                No products in this category yet.
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
