import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useCart } from '../../Context/CartContext';
import {
    Search,
    ChevronRight,
    ShoppingBag,
    Box,
    Check,
    Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ products = [], categories = [], filters = {} }) {
    const { addToCart } = useCart();
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
            <Head title="Products & Camera Systems — SM Gadgets Shop" />

            {/* Catalog Hero Banner */}
            <section className="relative py-12 sm:py-16 bg-[#f8f9fa] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        Product Ecosystem
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
                        Aerial & Handheld Imaging
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm font-normal">
                        Discover world-class camera drones, stabilizers, enterprise platforms, and official accessories at SM Gadgets Shop.
                    </p>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-3 sm:py-4 shadow-xs">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                    {/* Category Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                selectedCategory === 'all'
                                    ? 'bg-[#0070d5] text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All ({products.length})
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.slug)}
                                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                    selectedCategory === cat.slug
                                        ? 'bg-[#0070d5] text-white shadow-xs'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search & Sort Controls */}
                    <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1 md:w-60">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 sm:py-2 pl-8 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                            />
                            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </form>

                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 sm:py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0070d5] cursor-pointer"
                        >
                            <option value="featured">Featured</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-10 sm:py-16 bg-[#f8f9fa]">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                                    className="group flex flex-col rounded-3xl bg-white border border-gray-200/80 hover:border-blue-300 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                                >
                                    {/* Badge */}
                                    {product.badge && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-[#0070d5] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* 3D Ready Indicator */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-blue-50 text-[#0070d5] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                                            <Box className="w-3 h-3" />
                                            <span>3D View</span>
                                        </span>
                                    </div>

                                    {/* Image Container */}
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#f8f9fa] mb-4 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500"
                                    >
                                        <img
                                            src={product.thumbnail_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </Link>

                                    {/* Category Name */}
                                    <span className="text-[10px] font-bold text-[#0070d5] uppercase tracking-wider mb-1">
                                        {product.category?.name}
                                    </span>

                                    {/* Product Title & Tagline */}
                                    <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-[#0070d5] transition-colors mb-1 truncate">
                                        {product.name}
                                    </h3>
                                    {product.tagline && (
                                        <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                                            {product.tagline}
                                        </p>
                                    )}

                                    {/* Specs Snippet */}
                                    {product.specs && (
                                        <div className="grid grid-cols-2 gap-2 py-2.5 border-t border-b border-gray-100 mb-4 text-[11px]">
                                            {Object.entries(product.specs).slice(0, 2).map(([key, val], sIdx) => (
                                                <div key={sIdx} className="bg-gray-50 p-2 rounded-xl">
                                                    <span className="text-gray-400 block truncate text-[10px] uppercase font-bold">{key}</span>
                                                    <span className="text-gray-900 font-bold truncate block">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Price & Action */}
                                    <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                                        <div>
                                            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Starting at</span>
                                            <span className="text-base sm:text-lg font-black text-gray-950">
                                                ${Number(product.price).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition cursor-pointer"
                                                title="Quick Add to Cart"
                                            >
                                                <ShoppingBag className="w-4 h-4 text-[#0070d5]" />
                                            </button>

                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="px-3.5 py-2 rounded-xl bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                                            >
                                                <span>View</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl p-8 max-w-md mx-auto border border-gray-200 shadow-xs">
                            <Box className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-gray-950 mb-1">No products found</h3>
                            <p className="text-xs text-gray-500 mb-5">
                                Try adjusting your search query or selecting a different category.
                            </p>
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className="px-5 py-2 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-semibold shadow-xs cursor-pointer"
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
