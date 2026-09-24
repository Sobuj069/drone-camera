import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicParallax() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const shots = [
        {
            title: 'Shot on\nDJI RS 5',
            subtitle: 'Unshakable 4-Axis Cinematography in High-Speed Extreme Sports',
            link: '/products/aero-osmo-mobile-8',
            image_url: '/images/cinematic/shot-on-rs5-4k.jpg',
            alt: 'Cinematographer operating the DJI RS 5 gimbal rig tracking a skateboarder',
        },
        {
            title: 'Shot on\nDJI INSPIRE 3',
            subtitle: 'Epic 8K Aerial Sequences Over Icelandic Glaciers and Volcanic Canyons',
            link: '/products/aero-inspire-cinema-3',
            image_url: '/images/cinematic/shot-on-inspire3-4k.jpg',
            alt: 'Inspire 3 8K cinema drone filming mountain landscape',
        },
        {
            title: 'Shot on\nDJI MAVIC 3 PRO',
            subtitle: 'Golden Hour Mountain Ascents with Triple Focal Length Master Shots',
            link: '/products/aero-mavic-4-pro',
            image_url: '/images/cinematic/shot-on-mavic3-4k.jpg',
            alt: 'Mavic 3 Pro capturing mountain landscape',
        },
    ];

    const currentShot = shots[currentIndex];

    return (
        <section className="relative w-full h-[520px] md:h-[600px] my-3 overflow-hidden group select-none" data-purpose="cinematic-showcase">
            {/* Film set imagery */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <img
                        alt={currentShot.alt}
                        className="w-full h-full object-cover object-center"
                        src={currentShot.image_url}
                    />
                    {/* Dark contrast overlay */}
                    <div className="absolute inset-0 bg-black/25" />
                </motion.div>
            </AnimatePresence>

            {/* Centered text info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-2 drop-shadow-md whitespace-pre-line">
                    {currentShot.title}
                </h2>
                <Link
                    className="text-xs md:text-sm text-white/95 hover:text-white font-medium inline-flex items-center mt-2 underline-offset-4 hover:underline"
                    href={currentShot.link}
                >
                    Learn More &gt;
                </Link>
            </div>

            {/* Left Slider Arrow */}
            <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + shots.length) % shots.length)}
                aria-label="Previous slide"
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/75 hover:text-white transition z-20 hover:bg-black/30"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
            </button>

            {/* Right Slider Arrow */}
            <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % shots.length)}
                aria-label="Next slide"
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/75 hover:text-white transition z-20 hover:bg-black/30"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
            </button>
        </section>
    );
}
