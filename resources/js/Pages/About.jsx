import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Sparkles, Globe, Award, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    const milestones = [
        { year: '2020', title: 'AERO Founded', desc: 'Established with the mission to redefine aerial camera dynamics and AI flight algorithms.' },
        { year: '2022', title: 'O4 Transmission Architecture', desc: 'Introduced 20km ultra-low latency wireless video feed standard with anti-interference.' },
        { year: '2024', title: 'Omnidirectional LiDAR Integration', desc: 'First consumer and enterprise platform to integrate full-spectrum real-time point-cloud obstacle bypass.' },
        { year: '2026', title: 'Academy Award Recognition', desc: 'Honored with the Scientific and Technical Achievement Award for 4-axis cinema stabilization.' },
    ];

    return (
        <MainLayout>
            <Head title="About AERO - Engineering the Future of Flight & Vision" />

            {/* Hero */}
            <section className="py-24 bg-[#f5f6f8] border-b border-[#ebebeb] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        Our Vision
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-[#101418] tracking-tight">
                        Pioneering Aerial Intelligence
                    </h1>
                    <p className="text-lg text-[#707473] font-light max-w-2xl mx-auto">
                        At AERO, we engineer tools that empower creators, save lives in critical rescue operations, and revolutionize sustainable global agriculture.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Relentless Innovation',
                                desc: 'We invest over 25% of our revenue into advanced propulsion, optical sensor miniaturization, and deep learning vision systems.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Safety Without Compromise',
                                desc: 'Every airframe undergo thousands of wind tunnel tests, thermal cycling, and rigorous fault-tolerant avionics verification.',
                            },
                            {
                                icon: Globe,
                                title: 'Global Impact',
                                desc: 'From Hollywood soundstages to remote alpine rescue missions, AERO platforms operate reliably in over 100 countries.',
                            },
                        ].map((val, idx) => {
                            const Icon = val.icon;
                            return (
                                <div key={idx} className="bg-[#f5f6f8] rounded-3xl p-8 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0070d5]">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#101418]">{val.title}</h3>
                                    <p className="text-xs text-[#707473] leading-relaxed">{val.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-[#f5f6f8] border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#101418]">Our Journey</h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-gray-200">
                        {milestones.map((m, idx) => (
                            <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${
                                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                            } gap-6`}>
                                <div className="hidden sm:block sm:w-1/2" />
                                <div className="w-8 h-8 rounded-full bg-[#0070d5] border-4 border-white shadow-md flex items-center justify-center shrink-0 z-10 sm:absolute sm:left-1/2 sm:-translate-x-1/2" />
                                <div className="sm:w-1/2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                    <span className="text-xs font-bold text-[#0070d5] font-mono">{m.year}</span>
                                    <h4 className="text-base font-bold text-[#101418] mt-1">{m.title}</h4>
                                    <p className="text-xs text-[#707473] mt-2">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
