import React from 'react';
import { Link } from '@inertiajs/react';

export default function VirtualFlightBar() {
    return (
        <section className="bg-[#f5f6f8] border-y border-[#ebebeb] text-[#212121] py-4 px-6 select-none" data-purpose="virtual-flight-banner">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                <p className="text-xs md:text-sm text-[#707473] font-light">
                    Try Virtual Flight, online for free, and enjoy convenient one-stop device services.
                </p>
                <Link
                    href="/products/aero-mavic-4-pro"
                    className="bg-[#212121] hover:bg-black text-white text-xs px-5 py-2 rounded-full transition whitespace-nowrap shadow-sm font-medium"
                >
                    Download App
                </Link>
            </div>
        </section>
    );
}
