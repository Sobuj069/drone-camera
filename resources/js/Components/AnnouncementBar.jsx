import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, X } from 'lucide-react';

export default function AnnouncementBar() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <aside className="bg-[#f7f8f9] border-b border-[#ebebeb] text-[#2c2e30] py-2 px-4 text-center text-xs flex justify-between items-center relative z-40" data-purpose="notification-banner">
            <div className="w-6 hidden md:block" />
            <div className="mx-auto flex items-center justify-center space-x-1 font-normal">
                <span>Download the DJI Store app and be the first to experience the obstacle sensing of DJI virtually.</span>
                <Link
                    href="/products/aero-mavic-4-pro"
                    className="text-[#0070d5] hover:underline inline-flex items-center ml-1 font-medium"
                >
                    <span>Download the App</span>
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
            </div>
            <button
                onClick={() => setDismissed(true)}
                aria-label="Close banner"
                className="text-gray-400 hover:text-gray-700 p-1 transition-colors"
                type="button"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </aside>
    );
}
