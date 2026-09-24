import React from 'react';
import { Link } from '@inertiajs/react';

export default function InnovationSection({ posts = [] }) {
    const cards = Array.isArray(posts) && posts.length > 0
        ? posts.slice(0, 2).map((p) => ({
              tag: p.category_tag || 'Innovation Report',
              title: p.title.replace(/\bDJI\b/gi, 'SM'),
              link: `/news/${p.slug}`,
              bgColor: 'bg-[#89aabf]',
              image_url: p.image_url || '/images/innovation/innovation-agriculture-4k.jpg',
              alt: p.title,
          }))
        : [
              {
                  tag: 'Industry Insight Report',
                  title: 'SM Agriculture Annual Impact Report',
                  link: '/news/aero-agriculture-annual-report',
                  bgColor: 'bg-[#9bbad0]',
                  image_url: '/images/innovation/innovation-agriculture-4k.jpg',
                  alt: 'SM Agriculture spraying drone operating over farmland',
              },
              {
                  tag: 'Engineering, Science & Technology',
                  title: 'SM Ronin Cinema Gimbal Honored with Scientific Award',
                  link: '/news/aero-ronin-cinema-scientific-award',
                  bgColor: 'bg-[#89aabf]',
                  image_url: '/images/innovation/innovation-award-4k.jpg',
                  alt: 'SM Cinema Gimbal System honored with Scientific and Technical Award',
              },
          ];

    return (
        <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-6 sm:pb-12" data-purpose="innovation-section">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#111] mb-1.5 sm:mb-2">
                    Standing at the Forefront of Innovation
                </h2>
                <p className="text-xs sm:text-sm text-[#707473] font-normal leading-relaxed">
                    As we explore new technology, we push the capabilities of what is possible, driving progress through continuous innovation.
                </p>
            </div>

            {/* 2 Major Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {cards.map((card, idx) => (
                    <article
                        key={idx}
                        className={`relative h-[340px] sm:h-[440px] ${card.bgColor} overflow-hidden group flex flex-col items-center text-center p-5 sm:p-8 rounded-2xl`}
                    >
                        <img
                            alt={card.alt}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            src={card.image_url}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
                        <div className="relative z-10 text-white mt-2 max-w-md">
                            <p className="text-[11px] sm:text-xs text-white/80 font-normal tracking-wide">{card.tag}</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mt-1 mb-2 leading-snug drop-shadow-sm">
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
