import React from 'react';
import { Link } from '@inertiajs/react';

export default function UtilityIconsRow() {
    return (
        <section className="max-w-[1200px] mx-auto px-4 py-16" data-purpose="service-quick-links">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Where to buy */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center text-gray-600 mb-3">
                        <svg className="w-12 h-12 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#111] mb-1">Where to buy</h3>
                    <Link className="text-xs text-[#555] hover:text-[#0070d5] font-medium" href="/products">
                        Learn More &gt;
                    </Link>
                </div>

                {/* Support */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center text-gray-600 mb-3">
                        <svg className="w-12 h-12 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M18.364 5.636A9 9 0 0121 12v5a3 3 0 01-3 3h-1a1 1 0 01-1-1v-4a1 1 0 011-1h2a7 7 0 00-14 0h2a1 1 0 011 1v4a1 1 0 01-1 1H6a3 3 0 01-3-3v-5a9 9 0 012.636-6.364" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#111] mb-1">Support</h3>
                    <Link className="text-xs text-[#555] hover:text-[#0070d5] font-medium" href="/support">
                        Learn More &gt;
                    </Link>
                </div>

                {/* Fly Safe */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center text-gray-600 mb-3">
                        <svg className="w-12 h-12 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="text-base font-semibold text-[#111] mb-1">Fly Safe</h3>
                    <Link className="text-xs text-[#555] hover:text-[#0070d5] font-medium" href="/support">
                        Learn More &gt;
                    </Link>
                </div>
            </div>
        </section>
    );
}
