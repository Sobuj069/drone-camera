import React from 'react';
import { Link } from '@inertiajs/react';

export default function InnovationSection({ posts = [] }) {
    const cards = [
        {
            tag: 'Industry Insight Report',
            title: 'DJI Agriculture Annual Report',
            link: '/news/aero-agriculture-annual-report',
            bgColor: 'bg-[#9bbad0]',
            image_url: '/images/innovation/innovation-agriculture-4k.jpg',
            alt: 'Agriculture spraying drone operating over lush green farmland',
        },
        {
            tag: 'Engineering, Science & Technology',
            title: 'DJI Ronin 2 Gimbal System Honored with 2025 Scientific and Technical Award',
            link: '/news/aero-ronin-cinema-scientific-award',
            bgColor: 'bg-[#89aabf]',
            image_url: '/images/innovation/innovation-award-4k.jpg',
            alt: 'DJI Ronin 2 Gimbal System honored with Scientific and Technical Award',
        },
    ];

    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12" data-purpose="innovation-section">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-2">
                    Standing at the Forefront of Innovation
                </h2>
                <p className="text-xs md:text-sm text-[#707473] font-normal leading-relaxed">
                    As we explore new technology, we push the capabilities of what is possible, driving progress through continuous innovation.
                </p>
            </div>

            {/* 2 Major Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card, idx) => (
                    <article
                        key={idx}
                        className={`relative h-[440px] ${card.bgColor} overflow-hidden group flex flex-col items-center text-center p-8`}
                    >
                        <img
                            alt={card.alt}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            src={card.image_url}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
                        <div className="relative z-10 text-white mt-2 max-w-md">
                            <p className="text-xs text-white/80 font-normal tracking-wide">{card.tag}</p>
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-1 mb-2 leading-snug drop-shadow-sm">
                                {card.title}
                            </h3>
                            <Link className="text-xs text-white font-medium hover:underline inline-flex items-center" href={card.link}>
                                Learn More &gt;
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
