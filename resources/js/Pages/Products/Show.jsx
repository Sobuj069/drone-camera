import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import ProductViewer3D from '../../Components/ProductViewer3D';
import { useCart } from '../../Context/CartContext';
import {
    ChevronRight,
    ShoppingBag,
    CheckCircle2,
    Shield,
    Battery,
    Wifi,
    Camera,
    Gauge,
    Layers,
    Share2,
    HelpCircle,
    ArrowRight,
    Sparkles,
    Check,
    Plus,
    Minus,
    Zap,
    Truck,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Show({ product, relatedProducts = [] }) {
    if (!product) {
        return (
            <MainLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-xs text-gray-500 mb-6">The requested product could not be located in our catalog.</p>
                    <Link href="/products" className="px-6 py-2.5 bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold rounded-full transition shadow-md">
                        Return to Catalog
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const { addToCart } = useCart();
    const [selectedPackage, setSelectedPackage] = useState('fly_more');
    const [quantity, setQuantity] = useState(1);

    const safeJsonParse = (val, fallback) => {
        if (!val) return fallback;
        if (typeof val === 'object') return val;
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            } catch (e) {
                return fallback;
            }
        }
        return fallback;
    };

    const productColors = safeJsonParse(product.colors, []);
    const productSpecs = safeJsonParse(product.specs, {});
    const productFeatures = safeJsonParse(product.overview_features, []);

    const [selectedColor, setSelectedColor] = useState(
        (Array.isArray(productColors) && productColors[0]?.name) || 'Standard Graphite Grey'
    );

    const basePrice = Number(product.price) || 999;
    const packages = [
        {
            id: 'standard',
            name: 'Standard Package',
            price: basePrice,
            items: [
                `${product.name} Aircraft`,
                'AERO RC 2 Smart Controller',
                '1x Intelligent Flight Battery',
                '3x Low-Noise Propellers (Pair)',
                'Gimbal Protector',
                'Type-C PD Fast Cable',
            ],
        },
        {
            id: 'fly_more',
            name: 'Fly More Combo (Recommended)',
            price: basePrice + 499,
            items: [
                `${product.name} Aircraft`,
                'AERO RC Pro HD Screen Controller',
                '3x Intelligent Flight Batteries (138 Mins total)',
                '6x Low-Noise Propellers (Pair)',
                '100W Two-Way Battery Charging Hub',
                'Set of ND Filters (ND8/16/32/64)',
                'Water-Resistant Shoulder Carrying Bag',
            ],
        },
    ];

    const currentPackage = packages.find((p) => p.id === selectedPackage) || packages[0];

    const handleAddToCart = () => {
        addToCart(
            {
                id: `${product.id}-${currentPackage.id}`,
                name: `${product.name} (${currentPackage.name})`,
                slug: product.slug,
                tagline: product.tagline,
                price: currentPackage.price,
                thumbnail_url: product.thumbnail_url,
                colors: [{ name: selectedColor }],
            },
            quantity,
            selectedColor
        );
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.visit('/checkout');
    };

    return (
        <MainLayout>
            <Head title={`${product.name} — SM Gadgets Shop`} />

            {/* Sticky Sub-Navbar */}
            <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 py-3 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[#0070d5] font-bold uppercase tracking-wider hidden sm:inline">
                            {product.category?.name || 'Flagship Drone'} &bull;
                        </span>
                        <span className="text-sm sm:text-base font-black text-gray-950 truncate max-w-[180px] sm:max-w-none">
                            {product.name}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-gray-400 uppercase block">Starting at</span>
                            <span className="text-sm font-black text-gray-950">
                                ${currentPackage.price.toLocaleString()}
                            </span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold transition cursor-pointer"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="px-4 sm:px-5 py-2 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1"
                        >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Buy Now</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 1. Hero Intro */}
            <section className="pt-8 sm:pt-12 pb-6 sm:pb-8 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-2">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <Link href="/products" className="hover:text-gray-900">Products</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="font-semibold text-gray-900">{product.name}</span>
                    </nav>

                    {product.badge && (
                        <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                            {product.badge}
                        </span>
                    )}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight">
                        {product.name}
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-600 font-normal max-w-3xl mx-auto">
                        {product.subtitle || product.tagline || 'Next-generation aerial imaging and autonomous flight performance.'}
                    </p>
                </div>
            </section>

            {/* 2. Interactive HD Studio & 3D Stage */}
            <section className="py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <ProductViewer3D product={product} />
            </section>

            {/* 3. Standout Innovation Highlights */}
            {productFeatures && productFeatures.length > 0 && (
                <section className="py-12 sm:py-20 bg-[#f8f9fa] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                                Engineering Breakthroughs
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight">
                                Designed Without Compromise
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {productFeatures.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200/80 hover:border-blue-300 hover:shadow-lg transition-all group"
                                >
                                    <div className="text-2xl sm:text-3xl font-black text-[#0070d5] mb-2 font-mono group-hover:scale-105 transition-transform origin-left">
                                        {feature.stat}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-1.5">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Complete Technical Specifications Table */}
            {Object.keys(productSpecs).length > 0 && (
                <section className="py-12 sm:py-20 bg-white border-t border-gray-200 text-gray-900">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                                Technical Data
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight">
                                Specifications at a Glance
                            </h2>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-3xl p-5 sm:p-10 border border-gray-200/80 shadow-xs divide-y divide-gray-200/80">
                            {Object.entries(productSpecs).map(([specName, specVal], idx) => (
                                <div
                                    key={idx}
                                    className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
                                >
                                    <span className="text-xs sm:text-sm font-bold text-gray-900 sm:w-1/3">
                                        {specName}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-600 sm:w-2/3 font-medium">
                                        {specVal}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Package Combo Selector & Order Section */}
            <section id="order-section" className="py-12 sm:py-20 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                            Package Selection
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight">
                            Choose Your Combo & Purchase
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`cursor-pointer rounded-3xl p-6 sm:p-8 transition-all relative border ${
                                    selectedPackage === pkg.id
                                        ? 'bg-blue-50/40 border-[#0070d5] shadow-lg ring-2 ring-[#0070d5]/30'
                                        : 'bg-[#f8f9fa] border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {pkg.id === 'fly_more' && (
                                    <span className="absolute -top-3 right-6 bg-[#0070d5] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                        Best Value
                                    </span>
                                )}

                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-950">
                                        {pkg.name}
                                    </h3>
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            selectedPackage === pkg.id
                                                ? 'border-[#0070d5] bg-[#0070d5]'
                                                : 'border-gray-400'
                                        }`}
                                    >
                                        {selectedPackage === pkg.id && (
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        )}
                                    </div>
                                </div>

                                <div className="text-2xl sm:text-3xl font-black text-gray-950 mb-4">
                                    ${Number(pkg.price).toLocaleString()}
                                </div>

                                <div className="space-y-2 text-xs text-gray-700 border-t border-gray-200/80 pt-4">
                                    <div className="font-semibold text-gray-400 uppercase tracking-wider mb-2 text-[10px]">
                                        What's In The Box:
                                    </div>
                                    {pkg.items.map((item, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0070d5] shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Action Control Box */}
                    <div className="mt-8 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#f8f9fa] border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                        <div className="w-full md:w-auto">
                            <span className="text-xs text-gray-500 block">Selected Package:</span>
                            <h4 className="text-lg font-bold text-gray-950">
                                {product.name} — {currentPackage.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-2xl font-black text-[#0070d5]">
                                    ${(currentPackage.price * quantity).toLocaleString()}
                                </span>
                                {quantity > 1 && (
                                    <span className="text-xs text-gray-500">
                                        (${currentPackage.price.toLocaleString()} &times; {quantity})
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center border border-gray-300 rounded-2xl bg-white p-1 shadow-xs">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition cursor-pointer"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-10 text-center text-xs font-bold font-mono text-gray-950">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition cursor-pointer"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <ShoppingBag className="w-4 h-4 text-[#0070d5]" />
                                <span>Add to Cart</span>
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#0070d5] hover:bg-[#005bb5] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Zap className="w-4 h-4" />
                                <span>Buy Now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="py-12 sm:py-20 bg-[#f8f9fa] border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8 sm:mb-12">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-950">
                                Explore Related Systems
                            </h3>
                            <Link
                                href="/products"
                                className="text-xs font-semibold text-[#0070d5] hover:text-[#005bb5] inline-flex items-center gap-1"
                            >
                                <span>View Full Catalog</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedProducts.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/products/${rel.slug}`}
                                    className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-400 p-5 transition-all shadow-xs hover:shadow-lg flex flex-col"
                                >
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white flex items-center justify-center p-3 border border-gray-100">
                                        <img
                                            src={rel.thumbnail_url}
                                            alt={rel.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#0070d5] transition-colors line-clamp-1">
                                        {rel.name}
                                    </h4>
                                    <span className="text-xs text-gray-500 block mt-1 font-semibold">
                                        ${Number(rel.price).toLocaleString()}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mobile Fixed Bottom Action Bar */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
                <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Total</span>
                    <span className="text-base font-black text-gray-950">
                        ${(currentPackage.price * quantity).toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center gap-2 flex-1 justify-end">
                    <button
                        onClick={handleAddToCart}
                        className="p-2.5 rounded-xl bg-gray-100 text-gray-900 text-xs font-bold transition flex items-center justify-center cursor-pointer"
                        title="Add to Cart"
                    >
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="px-5 py-2.5 rounded-xl bg-[#0070d5] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Buy Now</span>
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
