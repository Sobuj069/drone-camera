import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import ProductViewer3D from '../../Components/ProductViewer3D';
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
    Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Show({ product, relatedProducts = [] }) {
    const [selectedPackage, setSelectedPackage] = useState('fly_more');
    const [activeSpecTab, setActiveSpecTab] = useState('all');

    const packages = [
        {
            id: 'standard',
            name: 'Standard Package',
            price: product.price,
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
            price: Number(product.price) + 499,
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

    return (
        <MainLayout>
            <Head title={`${product.name} - ${product.tagline || '3D Product Showcase'}`} />

            {/* Sticky Sub-Navbar */}
            <div className="sticky top-[60px] z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-[#0070d5] font-semibold uppercase tracking-wider block sm:inline sm:mr-2">
                            {product.category?.name}
                        </span>
                        <span className="text-base font-extrabold text-[#101418]">
                            {product.name}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-[#707473] uppercase block">Starting at</span>
                            <span className="text-sm font-bold text-[#101418]">
                                ${Number(product.price).toLocaleString()}
                            </span>
                        </div>
                        <a
                            href="#order-section"
                            className="px-5 py-2 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
            </div>

            {/* 1. Hero Intro */}
            <section className="pt-12 pb-8 bg-[#f5f6f8] border-b border-[#ebebeb]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    {product.badge && (
                        <span className="inline-block text-xs font-extrabold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
                            {product.badge}
                        </span>
                    )}
                    <h1 className="text-4xl sm:text-6xl font-black text-[#101418] tracking-tight uppercase">
                        {product.name}
                    </h1>
                    <p className="text-lg sm:text-2xl text-[#707473] font-light max-w-3xl mx-auto">
                        {product.subtitle || product.tagline}
                    </p>
                </div>
            </section>

            {/* 2. Interactive 3D Canvas Studio */}
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductViewer3D product={product} />
            </section>

            {/* 3. Standout Innovation Highlights */}
            {product.overview_features && product.overview_features.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                                Engineering Breakthroughs
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#101418] tracking-tight">
                                Designed Without Compromise
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.overview_features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-8 rounded-3xl bg-[#f5f6f8] border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                                >
                                    <div className="text-3xl sm:text-4xl font-black text-[#0070d5] mb-2 font-mono group-hover:scale-105 transition-transform origin-left">
                                        {feature.stat}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#101418] mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-[#707473] leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Complete Technical Specifications Table */}
            {product.specs && (
                <section className="py-20 bg-[#f5f6f8] border-t border-gray-200 text-gray-900">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                                Technical Data
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#101418] tracking-tight">
                                Specifications at a Glance
                            </h2>
                        </div>

                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm divide-y divide-gray-200">
                            {Object.entries(product.specs).map(([specName, specVal], idx) => (
                                <div
                                    key={idx}
                                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                >
                                    <span className="text-sm font-bold text-[#101418] sm:w-1/3">
                                        {specName}
                                    </span>
                                    <span className="text-sm text-[#707473] sm:w-2/3 font-medium">
                                        {specVal}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Package Combo Selector & Order Section */}
            <section id="order-section" className="py-20 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5]">
                            Package Selection
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#101418] tracking-tight">
                            Choose Your Combo
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`cursor-pointer rounded-3xl p-8 transition-all relative border ${
                                    selectedPackage === pkg.id
                                        ? 'bg-blue-50/40 border-[#0070d5] shadow-xl ring-2 ring-[#0070d5]/20'
                                        : 'bg-[#f5f6f8] border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                {pkg.id === 'fly_more' && (
                                    <span className="absolute -top-3 right-6 bg-[#0070d5] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                        Best Value
                                    </span>
                                )}

                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-[#101418]">
                                        {pkg.name}
                                    </h3>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedPackage === pkg.id ? 'border-[#0070d5] bg-[#0070d5]' : 'border-gray-400'
                                    }`}>
                                        {selectedPackage === pkg.id && (
                                            <Check className="w-3.5 h-3.5 text-white" />
                                        )}
                                    </div>
                                </div>

                                <div className="text-2xl sm:text-3xl font-black text-[#101418] mb-6">
                                    ${Number(pkg.price).toLocaleString()}
                                </div>

                                <div className="space-y-2.5 text-xs text-gray-700 border-t border-gray-200 pt-6">
                                    <div className="font-semibold text-[#707473] uppercase tracking-wider mb-2 text-[10px]">
                                        What's In The Box:
                                    </div>
                                    {pkg.items.map((item, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#0070d5] shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Action Box */}
                    <div className="mt-12 max-w-4xl mx-auto p-8 rounded-3xl bg-[#f5f6f8] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                        <div>
                            <span className="text-xs text-[#707473] block">Selected Configuration</span>
                            <h4 className="text-xl font-bold text-[#101418]">
                                {product.name} — {currentPackage.name}
                            </h4>
                            <span className="text-2xl font-black text-[#0070d5]">
                                ${Number(currentPackage.price).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all text-center"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
                <section className="py-20 bg-[#f5f6f8] border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl font-bold text-[#101418]">
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
                                    className="group rounded-3xl bg-white hover:bg-white border border-gray-200 hover:border-blue-400 p-5 transition-all shadow-sm hover:shadow-lg"
                                >
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#f5f6f8]">
                                        <img
                                            src={rel.thumbnail_url}
                                            alt={rel.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="text-base font-bold text-[#101418] group-hover:text-[#0070d5] transition-colors">
                                        {rel.name}
                                    </h4>
                                    <span className="text-xs text-[#707473] block mt-1">
                                        ${Number(rel.price).toLocaleString()}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
