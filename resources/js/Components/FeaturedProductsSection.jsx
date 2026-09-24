import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingBag, Star, ArrowRight, Check, Eye } from 'lucide-react';
import { useCart } from '../Context/CartContext';

export default function FeaturedProductsSection({ products = [] }) {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [addedIds, setAddedIds] = useState({});

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'camera-drones', name: 'Camera Drones' },
        { id: 'handheld', name: 'Handheld & Gimbals' },
        { id: 'enterprise', name: 'Commercial & Enterprise' },
        { id: 'power', name: 'Power & Charging' },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category?.slug === selectedCategory);

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setAddedIds((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedIds((prev) => ({ ...prev, [product.id]: false }));
        }, 1800);
    };

    return (
        <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 select-none" data-purpose="popular-products-catalog">
            {/* Header with Title & Category Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#0070d5]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0070d5]">Official Store Catalog</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight">
                        Popular Gear & Drones
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                        Discover top-rated aerial camera systems, handheld gimbals, and high-performance smart gadgets.
                    </p>
                </div>

                {/* Category Filter Pills (Scrollable on mobile) */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                                selectedCategory === cat.id
                                    ? 'bg-gray-950 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product) => {
                    const isAdded = addedIds[product.id];
                    const discount = product.original_price && product.original_price > product.price
                        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                        : null;

                    return (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl border border-gray-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                        >
                            {/* Product Badge / Discount */}
                            <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                                {product.badge && (
                                    <span className="bg-gray-950/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md tracking-tight uppercase shadow-xs">
                                        {product.badge}
                                    </span>
                                )}
                                {discount && (
                                    <span className="bg-rose-500 text-white text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-md tracking-tight shadow-xs">
                                        -{discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Product Image Stage with Zoom */}
                            <Link
                                href={`/products/${product.slug}`}
                                className="relative aspect-[4/3] bg-gradient-to-b from-[#f8f9fa] to-[#eef0f3] overflow-hidden flex items-center justify-center p-3 sm:p-5"
                            >
                                <img
                                    src={product.thumbnail_url || product.gallery?.[0] || '/images/cards/card-dji-flip-hd.jpg'}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                                />
                            </Link>

                            {/* Product Info & Pricing */}
                            <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                                <div>
                                    <div className="flex items-center justify-between gap-2 text-[11px] text-gray-400 font-medium mb-1">
                                        <span>{product.category?.name || 'Gadget'}</span>
                                        <div className="flex items-center text-amber-400 font-semibold text-[10px]">
                                            <Star className="w-3 h-3 fill-current inline mr-0.5" />
                                            <span>5.0</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#0070d5] transition-colors line-clamp-1 mb-1 tracking-tight"
                                    >
                                        {product.name}
                                    </Link>

                                    <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 mb-3">
                                        {product.tagline || product.subtitle || 'Ultra-high performance aerial camera'}
                                    </p>
                                </div>

                                {/* Price & Add to Cart Button */}
                                <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <div className="text-base sm:text-lg font-black text-gray-950 tracking-tight leading-none">
                                            ${parseFloat(product.price).toLocaleString()}
                                        </div>
                                        {product.original_price && product.original_price > product.price && (
                                            <div className="text-[11px] text-gray-400 line-through font-normal mt-0.5">
                                                ${parseFloat(product.original_price).toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs ${
                                            isAdded
                                                ? 'bg-emerald-600 text-white scale-98'
                                                : 'bg-[#0070d5] hover:bg-[#005bb5] active:scale-95 text-white'
                                        }`}
                                        title="Add to Cart"
                                    >
                                        {isAdded ? (
                                            <>
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Added</span>
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                                <span>Add</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View All Store Products CTA Button */}
            <div className="mt-10 sm:mt-14 text-center">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-gray-950 hover:bg-black text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-xl hover:gap-3 transition-all duration-200"
                >
                    <span>Explore All Products in Store</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
