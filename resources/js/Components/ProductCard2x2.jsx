import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProductCard2x2() {
    const cards = [
        {
            id: 'osmo-360',
            title: 'OSMO 360',
            image_url: '/images/cards/card-osmo-360-hd.jpg',
            image_alt: 'DJI Osmo 360 action cameras',
            href: '/products/aero-neo-360',
        },
        {
            id: 'dji-flip',
            title: 'DJI FLIP',
            image_url: '/images/cards/card-dji-flip-hd.jpg',
            image_alt: 'DJI Flip compact camera drone',
            href: '/products/aero-mavic-4-pro',
        },
        {
            id: 'osmo-mobile-8',
            title: 'OSMO MOBILE 8',
            image_url: '/images/cards/card-osmo-mobile-8-hd.jpg',
            image_alt: 'Osmo Mobile 8 smartphone gimbal',
            href: '/products/aero-osmo-mobile-8',
        },
        {
            id: 'compare-drones',
            title: 'Compare Camera Drones',
            image_url: '/images/cards/card-compare-drones-hd.jpg',
            image_alt: 'Compare DJI camera drones side by side',
            href: '/compare',
        },
    ];

    return (
        <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 select-none" data-purpose="featured-2x2-showcase">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {cards.map((card) => (
                    <Link
                        key={card.id}
                        href={card.href}
                        className="group relative aspect-[16/10] sm:aspect-[16/9.2] bg-[#f5f6f8] overflow-hidden block transition-all duration-300"
                        aria-label={card.title}
                    >
                        {/* Background Product Studio Imagery */}
                        <img
                            src={card.image_url}
                            alt={card.image_alt}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
