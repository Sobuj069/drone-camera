import React from 'react';
import { Link } from '@inertiajs/react';

export default function FieldsExploreSection({ categories = [] }) {
    const fields = [
        {
            title: 'Video Production',
            subtitle: 'Professional Aerial and Ground Filmmaking Tools',
            link: '/products?category=camera-drones',
            bgColor: 'bg-[#233544]',
            image_url: '/images/fields/field-video-production-4k.jpg',
            alt: 'Professional aerial and ground filmmaking camera vehicle mount rig',
        },
        {
            title: 'Enterprise',
            subtitle: 'Drone Solutions for a New Generation of Work',
            link: '/products?category=enterprise',
            bgColor: 'bg-[#344455]',
            image_url: '/images/fields/field-enterprise-4k.jpg',
            alt: 'DJI Enterprise drone inspecting high-voltage power lines',
        },
        {
            title: 'Agriculture',
            subtitle: 'Efficient and Intelligent Agricultural Solution',
            link: '/products?category=agriculture',
            bgColor: 'bg-[#455444]',
            image_url: '/images/fields/field-agriculture-4k.jpg',
            alt: 'Agricultural drone operating over orchards in mountainous landscape',
        },
    ];

    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-purpose="fields-grid">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#111] mb-8">
                Explore DJI Products in Different Fields
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fields.map((field, idx) => (
                    <div
                        key={idx}
                        className={`relative h-[440px] overflow-hidden group flex flex-col items-center text-center p-7 ${field.bgColor}`}
                    >
                        <img
                            alt={field.alt}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            src={field.image_url}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
                        <div className="relative z-10 text-white mt-auto">
                            <h3 className="text-2xl font-bold tracking-tight mb-1">
                                {field.title}
                            </h3>
                            <p className="text-xs text-gray-300 font-light max-w-[200px] mx-auto mb-3">
                                {field.subtitle}
                            </p>
                            <Link className="text-xs text-white font-medium hover:underline inline-block mb-4" href={field.link}>
                                Learn More &gt;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
