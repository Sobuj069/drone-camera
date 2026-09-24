import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBannerSlider({ banners = [] }) {
    const [currentIndex, setCurrentIndex] = useState(1); // Default to DJI Mavic 3 Pro (index 1)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const fallbackSlides = [
        {
            id: 1,
            badge: 'TRIPLE-LENS CAMERA DRONE',
            title: 'SM MAVIC 3 PRO',
            subtitle: 'Inspiration in Focus',
            cta_link: '/products/aero-mavic-4-pro',
            image_url: '/images/hero/hero-mavic-3-pro-4k.jpg',
        },
        {
            id: 2,
            badge: 'DUAL-PRIMARY CAMERA DRONE',
            title: 'SM AIR 3S',
            subtitle: 'Chase the View',
            cta_link: '/products/aero-neo-360',
            image_url: '/images/hero/hero-air-3s-4k.jpg',
        },
        {
            id: 3,
            badge: 'REVOLUTIONARY ACTION CAMERA',
            title: 'SM ACTION 5 PRO',
            subtitle: 'All in One Ultra-Stabilized 4K',
            cta_link: '/products/aero-osmo-mobile-8',
            image_url: '/images/hero/hero-osmo-action-5-4k.jpg',
        },
    ];

    const slides = Array.isArray(banners) && banners.length > 0
        ? banners.map((b, i) => ({
              id: b.id || i + 1,
              badge: b.badge || 'SM FLAGSHIP',
              title: (b.title || 'SM DRONE').replace(/\bDJI\b/gi, 'SM'),
              subtitle: b.subtitle || '',
              cta_link: b.cta_link || '/products',
              image_url: b.image_url || '/images/hero/hero-mavic-3-pro-4k.jpg',
          }))
        : fallbackSlides;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, slides.length]);

    const currentSlide = slides[currentIndex];

    return (
        <section
            className="relative w-full h-[620px] md:h-[720px] bg-neutral-900 text-white overflow-hidden select-none"
            data-purpose="hero-section"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Hero Background Image & Cinematic Overlay */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        alt={currentSlide.title}
                        className="w-full h-full object-cover object-center scale-100"
                        src={currentSlide.image_url}
                    />
                    {/* Subtle cinematic gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Centered Content Details */}
            <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-start pt-16 md:pt-20 text-center px-4">
                <span className="text-xs md:text-sm tracking-wide text-gray-300 uppercase font-medium">
                    {currentSlide.badge}
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-1 mb-2 text-white">
                    {currentSlide.title.includes('PRO') ? (
                        <>
                            {currentSlide.title.replace('PRO', '')}
                            <span className="font-normal text-gray-200">PRO</span>
                        </>
                    ) : (
                        currentSlide.title
                    )}
                </h1>

                <p className="text-base md:text-lg text-gray-200 font-light mb-6 tracking-wide">
                    {currentSlide.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <Link
                        href={currentSlide.cta_link}
                        className="px-5 py-1.5 border border-white/80 rounded-full text-xs md:text-sm font-medium hover:bg-white hover:text-black transition-all"
                    >
                        Learn More &gt;
                    </Link>
                    <Link
                        href={currentSlide.cta_link}
                        className="px-5 py-1.5 border border-white/80 rounded-full text-xs md:text-sm font-medium hover:bg-white hover:text-black transition-all"
                    >
                        Buy Now &gt;
                    </Link>
                </div>
            </div>

            {/* Hero Bottom Left Carousel Indicators */}
            <div className="absolute bottom-8 left-8 md:left-16 z-20 flex flex-col space-y-2 text-xs font-light text-gray-400">
                {slides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`cursor-pointer transition-all flex items-center space-x-2 ${
                            currentIndex === idx ? 'text-white font-medium' : 'hover:text-white'
                        }`}
                    >
                        {currentIndex === idx && (
                            <span className="w-1 h-3.5 bg-white rounded-sm" />
                        )}
                        <span>{slide.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
