import React from 'react';
import { Link } from '@inertiajs/react';

export default function VirtualFlightBar() {
    return (
        <section className="bg-[#f5f6f8] border-y border-[#ebebeb] text-[#212121] py-3.5 sm:py-4 px-4 sm:px-6 select-none" data-purpose="virtual-flight-banner">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm text-[#707473] font-light">
                    Try Virtual Flight, online for free, and enjoy convenient one-stop device services.
                </p>
                <Link
                    href="/products"
                    className="bg-[#212121] hover:bg-black text-white text-xs px-5 py-2 rounded-full transition whitespace-nowrap shadow-sm font-medium w-full sm:w-auto text-center"
                >
                    Explore App
                </Link>
            </div>
        </section>
    );
}
