import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import {
    Download,
    Shield,
    Wrench,
    FileText,
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    ArrowRight
} from 'lucide-react';

export default function Support() {
    const [faqOpen, setFaqOpen] = useState({ 0: true });

    const toggleFaq = (idx) => {
        setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    const faqs = [
        {
            q: 'Can I bring AERO Intelligent Flight Batteries on commercial aircraft?',
            a: 'Yes. Most commercial airline regulations allow lithium-ion drone batteries rated under 100Wh in your carry-on luggage. The standard AERO Mavic 4 Pro battery is rated at 77Wh, making it fully compliant for domestic and international cabin travel.',
        },
        {
            q: 'How do I update the aircraft and remote controller firmware?',
            a: 'Power on both your drone and the AERO RC smart controller. Ensure your controller is connected to Wi-Fi. A notification prompt will automatically appear when a new firmware release is detected. Tap "Update" and ensure battery levels are above 50%.',
        },
        {
            q: 'What is covered under AERO Care Refresh?',
            a: 'AERO Care Refresh covers comprehensive accidental damage including water damage, collision damage, drop damage, and flyaway scenarios, offering up to 2 low-cost replacements per year with express shipping.',
        },
        {
            q: 'What are the GEO Airspace Restrictions and how do I unlock restricted zones for commercial missions?',
            a: 'AERO GEO Safety System automatically prevents flight in sensitive locations such as airports and military airfields. Authorized enterprise operators can request custom GEO Zone unlock certificates directly through the AERO Fly Safe portal with verified aviation credentials.',
        },
    ];

    return (
        <MainLayout>
            <Head title="Support & Download Center - AERO" />

            {/* Header with Search */}
            <section className="py-20 bg-[#f5f6f8] border-b border-[#ebebeb] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        Official Service Portal
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#101418] tracking-tight">
                        How Can We Assist You?
                    </h1>
                    <p className="text-sm sm:text-base text-[#707473] font-light">
                        Access firmware downloads, manuals, flight safety guidelines, and warranty repair services.
                    </p>
                </div>
            </section>

            {/* Service Portals 4-Card Grid */}
            <section className="py-16 bg-[#f5f6f8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Download,
                                title: 'Download Center',
                                desc: 'Firmware packages, AERO Fly Studio app, and calibration utilities.',
                                link: '/products',
                            },
                            {
                                icon: Shield,
                                title: 'Fly Safe & GEO Maps',
                                desc: 'Check local airspace regulations, restricted zones, and authorization.',
                                link: '/contact',
                            },
                            {
                                icon: Wrench,
                                title: 'Repair & Maintenance',
                                desc: 'Request official repair diagnostics, track RMA, or claim AeroCare.',
                                link: '/contact',
                            },
                            {
                                icon: FileText,
                                title: 'User Guides & Manuals',
                                desc: 'Comprehensive step-by-step pilot tutorials and safety documentation.',
                                link: '/news',
                            },
                        ].map((portal, idx) => {
                            const Icon = portal.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={portal.link}
                                    className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0070d5] mb-4 group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#101418] mb-2 group-hover:text-[#0070d5] transition-colors">
                                            {portal.title}
                                        </h3>
                                        <p className="text-xs text-[#707473] leading-relaxed">
                                            {portal.desc}
                                        </p>
                                    </div>
                                    <div className="pt-6 flex items-center text-xs font-semibold text-[#0070d5] group-hover:translate-x-1 transition-transform">
                                        <span>Access Service</span>
                                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-20 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2">
                        <h2 className="text-3xl font-black text-[#101418]">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs text-[#707473]">
                            Quick answers to common questions about battery care, flight regulations, and warranties.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = !!faqOpen[idx];
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#f5f6f8] rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="text-sm sm:text-base font-bold text-[#101418]">
                                            {faq.q}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp className="w-4 h-4 text-[#0070d5] shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-[#707473] shrink-0" />
                                        )}
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-6 text-xs sm:text-sm text-[#555] leading-relaxed border-t border-gray-200 pt-4 bg-white">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Need more help */}
                    <div className="mt-16 text-center p-8 rounded-3xl bg-[#f5f6f8] border border-gray-200 space-y-3 shadow-sm">
                        <h4 className="text-lg font-bold text-[#101418]">Still have questions?</h4>
                        <p className="text-xs text-[#707473] max-w-md mx-auto">
                            Our team of product specialists and flight safety engineers are available 24/7.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
                        >
                            Contact Support Team
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
