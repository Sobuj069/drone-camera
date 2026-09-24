import React from 'react';
import Navbar from '../Components/Navbar';
import AnnouncementBar from '../Components/AnnouncementBar';
import Footer from '../Components/Footer';
import CookieConsent from '../Components/CookieConsent';
import FlashToast from '../Components/FlashToast';
import FloatingWidgets from '../Components/FloatingWidgets';
import { CartProvider } from '../Context/CartContext';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-[#212121] selection:bg-[#0070d5] selection:text-white">
            <FlashToast />
            <AnnouncementBar />
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <FloatingWidgets />
            <CookieConsent />
            <Footer />
        </div>
    );
}
