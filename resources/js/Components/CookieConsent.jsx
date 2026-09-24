import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = typeof window !== 'undefined' ? localStorage.getItem('dji_cookie_consent') : 'accepted';
            if (!consent) {
                const timer = setTimeout(() => setVisible(true), 1000);
                return () => clearTimeout(timer);
            }
        } catch (e) {}
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem('dji_cookie_consent', 'accepted');
        } catch (e) {}
        setVisible(false);
    };

    const handleReject = () => {
        try {
            localStorage.setItem('dji_cookie_consent', 'rejected');
        } catch (e) {}
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-2xl z-50 py-3.5 px-6" data-purpose="cookie-consent">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-[12px] text-gray-600 leading-tight pr-4">
                    <strong className="text-black block mb-0.5">We Value Your Privacy</strong>
                    This website uses cookies and similar technologies to enhance your browsing experience. By selecting "Accept All Cookies", you consent to all cookies, which are used for user behavior analysis, advertising, and personalized services. Click <Link className="text-[#0070d5] hover:underline" href="/about">"Cookie Preferences"</Link> to view details and manage which cookies are allowed or blocked. Selecting "Reject All Cookies" will enable only essential cookies, which may limit some features. For more information, please see our <Link className="text-[#0070d5] hover:underline" href="/about">Cookie Policy</Link>.
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                    <button
                        onClick={handleReject}
                        className="text-xs px-3.5 py-1.5 text-gray-700 hover:text-black font-medium transition"
                        type="button"
                    >
                        Cookie Preferences
                    </button>
                    <button
                        onClick={handleReject}
                        className="text-xs px-4 py-1.5 bg-[#0070d5] hover:bg-[#005bb5] text-white font-medium rounded-sm transition"
                        type="button"
                    >
                        Reject All Cookies
                    </button>
                    <button
                        onClick={handleAccept}
                        className="text-xs px-4 py-1.5 bg-[#0070d5] hover:bg-[#005bb5] text-white font-medium rounded-sm transition"
                        type="button"
                    >
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}
