import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import {
    Search,
    Filter,
    SlidersHorizontal,
    ChevronRight,
    Sparkles,
    Scale,
    Eye,
    Check,
    Box
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ products = [], categories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [sortBy, setSortBy] = useState(filters.sort || 'featured');

    const handleCategoryChange = (slug) => {
        setSelectedCategory(slug);
        router.get(
            '/products',
            { category: slug, search: search, sort: sortBy },
            { preserveState: true, replace: true }
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/products',
            { category: selectedCategory, search: search, sort: sortBy },
            { preserveState: true, replace: true }
        );
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        router.get(
            '/products',
            { category: selectedCategory, search: search, sort: newSort },
            { preserveState: true, replace: true }
        );
    };

    return (
        <MainLayout>
            <Head title="Products & Camera Systems - AERO Store" />

            {/* Catalog Hero Banner */}
            <section className="relative py-16 sm:py-20 bg-[#f5f6f8] border-b border-[#ebebeb]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        Product Ecosystem
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-[#101418] tracking-tight">
                        Aerial & Handheld Imaging
                    </h1>
                    <p className="text-[#707473] max-w-2xl mx-auto text-sm sm:text-base font-light">
                        Discover world-class camera drones, stabilizers, enterprise inspection platforms, and precision agriculture tools.
                    </p>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                selectedCategory === 'all'
                                    ? 'bg-[#0070d5] text-white shadow-md'
                                    : 'bg-[#f5f6f8] text-[#555] hover:bg-gray-200 hover:text-black'
                            }`}
                        >
                            All Products ({products.length})
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.slug)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                    selectedCategory === cat.slug
                                        ? 'bg-[#0070d5] text-white shadow-md'
                                        : 'bg-[#f5f6f8] text-[#555] hover:bg-gray-200 hover:text-black'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort Controls */}
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-[#f5f6f8] border border-gray-200 rounded-full px-4 py-2 pl-9 text-xs text-[#212121] placeholder-[#707473] focus:outline-none focus:border-[#0070d5] focus:bg-white"
                            />
                            <Search className="w-3.5 h-3.5 text-[#707473] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </form>

                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-[#f5f6f8] border border-gray-200 rounded-full px-3 py-2 text-xs text-[#212121] focus:outline-none focus:border-[#0070d5] cursor-pointer"
                        >
                            <option value="featured">Featured First</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="newest">Newest Releases</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 bg-[#f5f6f8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group flex flex-col rounded-3xl bg-white hover:bg-white border border-gray-200 hover:border-blue-400 p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                                >
                                    {/* Badge */}
                                    {product.badge && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-[#0070d5] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* 3D Ready Indicator */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-blue-50 text-[#0070d5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                                            <Box className="w-3 h-3" />
                                            <span>3D View</span>
                                        </span>
                                    </div>

                                    {/* Image Container */}
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f5f6f8] mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                                    >
                                        <img
                                            src={product.thumbnail_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </Link>

                                    {/* Category Name */}
                                    <span className="text-[11px] font-bold text-[#0070d5] uppercase tracking-wider mb-1">
                                        {product.category?.name}
                                    </span>

                                    {/* Product Title & Tagline */}
                                    <h3 className="text-xl font-bold text-[#101418] group-hover:text-[#0070d5] transition-colors mb-1">
                                        {product.name}
                                    </h3>
                                    {product.tagline && (
                                        <p className="text-xs text-[#707473] line-clamp-1 mb-4">
                                            {product.tagline}
                                        </p>
                                    )}

                                    {/* Specs Snippet */}
                                    {product.specs && (
                                        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-gray-100 mb-4 text-[11px]">
                                            {Object.entries(product.specs).slice(0, 2).map(([key, val], sIdx) => (
                                                <div key={sIdx} className="bg-[#f5f6f8] p-2 rounded-lg">
                                                    <span className="text-[#707473] block truncate">{key}</span>
                                                    <span className="text-[#101418] font-semibold truncate block">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Price & Action */}
                                    <div className="mt-auto pt-2 flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-[#707473] block">Starting at</span>
                                            <span className="text-xl font-extrabold text-[#101418]">
                                                ${Number(product.price).toLocaleString()}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="px-4 py-2 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-blue-500/20 group/btn"
                                        >
                                            <span>Experience</span>
                                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl p-12 max-w-md mx-auto border border-gray-200 shadow-sm">
                            <Box className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-[#101418] mb-2">No products found</h3>
                            <p className="text-xs text-[#707473] mb-6">
                                Try adjusting your search query or selecting a different category.
                            </p>
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className="px-5 py-2 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-semibold shadow-sm"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
