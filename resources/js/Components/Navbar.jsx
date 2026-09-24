import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Search, User, Globe, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Navbar() {
    const page = usePage() || {};
    const { navCategories = [] } = page.props || {};
    const url = page.url || '';

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('United States');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [url]);

    return (
        <>
            <header
                className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition duration-300 ${
                    scrolled ? 'shadow-sm' : ''
                }`}
                data-purpose="site-navigation"
            >
                <div className="max-w-[1440px] mx-auto px-6 h-[58px] flex items-center justify-between">
                    {/* Brand Logo and Primary Nav */}
                    <div className="flex items-center space-x-8">
                        {/* DJI Official Wordmark Logo */}
                        <Link aria-label="DJI Homepage" className="flex items-center text-black group" href="/">
                            <svg className="h-[22px] w-auto fill-current group-hover:text-[#0070d5] transition-colors" viewBox="0 0 82 30">
                                <path d="M12.986 0H0v29.54h12.986c8.536 0 14.44-5.748 14.44-14.77C27.426 5.748 21.522 0 12.986 0zm-6.233 23.34V6.2h6.233c4.896 0 8.016 3.42 8.016 8.57 0 5.15-3.12 8.57-8.016 8.57H6.753zm26.963 6.2h6.425V0h-6.425v29.54zm22.483-8.862c-3.12 0-5.18-1.52-5.18-4.43V0h-6.425v16.248c0 7.378 4.704 13.292 11.605 13.292 8.44 0 14.152-5.938 14.152-14.77V0h-6.425v14.77c0 5.15-3.12 8.57-7.727 8.57z" />
                            </svg>
                        </Link>

                        {/* Main Categories Links */}
                        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium text-[#111] tracking-normal">
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/products?category=camera-drones">
                                Camera Drones
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/products?category=handheld">
                                Handheld
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/products?category=power">
                                Power
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/products?category=enterprise">
                                Specialized
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/news">
                                Explore
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/support">
                                Support
                            </Link>
                            <Link className="hover:text-[#0070d5] transition-colors py-4" href="/compare">
                                Where to Buy
                            </Link>
                        </nav>
                    </div>

                    {/* Right Action Items (Search, Profile, Region, Store CTA) */}
                    <div className="flex items-center space-x-5 text-[#333]">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            className="p-1.5 hover:text-[#0070d5] transition"
                        >
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </button>

                        {/* User Profile / Admin Panel */}
                        <a
                            href="/admin"
                            aria-label="Account"
                            className="p-1.5 hover:text-[#0070d5] transition flex items-center gap-1"
                            title="Admin Portal"
                        >
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </a>

                        {/* Country / Language */}
                        <div className="relative hidden md:block">
                            <button
                                onClick={() => setRegionOpen(!regionOpen)}
                                className="flex items-center space-x-1 text-xs text-[#555] hover:text-[#0070d5] transition"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
                                    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18" strokeWidth="1.8" />
                                </svg>
                                <span className="font-normal text-[13px] ml-1">{selectedRegion}</span>
                            </button>

                            {regionOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg border border-gray-200 shadow-xl p-2 z-50">
                                    {['United States', 'European Union', 'United Kingdom', 'Japan', 'Australia'].map((reg, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setSelectedRegion(reg);
                                                setRegionOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 text-xs rounded transition-colors ${
                                                selectedRegion === reg
                                                    ? 'bg-[#0070d5]/10 text-[#0070d5] font-semibold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {reg}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Store Button */}
                        <Link
                            href="/products"
                            className="bg-[#0070d5] hover:bg-[#005bb5] text-white px-4 py-1.5 rounded-full text-[13px] font-medium flex items-center space-x-1.5 transition duration-150"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                            <span>Store</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1.5 text-gray-700 hover:text-[#0070d5] lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[58px] z-40 bg-white border-t border-gray-100 p-6 overflow-y-auto">
                        <div className="space-y-4">
                            <Link href="/products?category=camera-drones" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Camera Drones
                            </Link>
                            <Link href="/products?category=handheld" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Handheld
                            </Link>
                            <Link href="/products?category=power" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Power
                            </Link>
                            <Link href="/products?category=enterprise" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Specialized
                            </Link>
                            <Link href="/news" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Explore
                            </Link>
                            <Link href="/support" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Support
                            </Link>
                            <Link href="/compare" className="block text-base font-medium text-[#111] py-2 border-b border-gray-100">
                                Compare Drones
                            </Link>
                            <a href="/admin" className="block text-base font-semibold text-[#0070d5] py-2">
                                Admin Portal &rarr;
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
