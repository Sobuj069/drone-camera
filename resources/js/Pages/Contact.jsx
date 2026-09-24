import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Loader2,
    CheckCircle2,
    Building,
    Clock,
    Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        department: 'Sales',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout>
            <Head title="Contact Sales & Support - AERO" />

            {/* Header */}
            <section className="py-20 bg-[#f5f6f8] border-b border-[#ebebeb] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-[#101418] tracking-tight">
                        Contact AERO Specialist Team
                    </h1>
                    <p className="text-sm sm:text-base text-[#707473] font-light max-w-xl mx-auto">
                        Whether you are inquiring about enterprise fleet procurement, cinema camera rigs, or technical service, we are here to help.
                    </p>
                </div>
            </section>

            {/* Main Form & Info Grid */}
            <section className="py-16 bg-[#f5f6f8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Form Column (7 Cols) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl">
                            <h2 className="text-2xl font-black text-[#101418] mb-2">
                                Send an Inquiry
                            </h2>
                            <p className="text-xs text-[#707473] mb-8">
                                Complete the form below and an assigned specialist will respond within 24 hours.
                            </p>

                            {recentlySuccessful && (
                                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>Thank you! Your message has been sent successfully. We will be in touch shortly.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#101418]">
                                            Full Name <span className="text-[#0070d5]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Marcus Vance"
                                            className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                                        />
                                        {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#101418]">
                                            Email Address <span className="text-[#0070d5]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="marcus@example.com"
                                            className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                                        />
                                        {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#101418]">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                                        />
                                        {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                                    </div>

                                    {/* Department */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#101418]">
                                            Department <span className="text-[#0070d5]">*</span>
                                        </label>
                                        <select
                                            value={data.department}
                                            onChange={(e) => setData('department', e.target.value)}
                                            className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] focus:outline-none focus:border-[#0070d5] focus:bg-white cursor-pointer"
                                        >
                                            <option value="Sales">Sales & Product Orders</option>
                                            <option value="Enterprise">Enterprise & Agriculture Fleet</option>
                                            <option value="Media">Media & Cinema Production</option>
                                            <option value="Support">Technical Support & Repair</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#101418]">
                                        Subject <span className="text-[#0070d5]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                        placeholder="e.g. Enterprise Fleet Quote for 10x Matrice Units"
                                        className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                                    />
                                    {errors.subject && <p className="text-xs text-rose-500">{errors.subject}</p>}
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-[#101418]">
                                        Message Details <span className="text-[#0070d5]">*</span>
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        required
                                        placeholder="Please provide details regarding your requirements, expected timeline, and destination country..."
                                        className="w-full bg-[#f5f6f8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#101418] placeholder-gray-400 focus:outline-none focus:border-[#0070d5] focus:bg-white"
                                    />
                                    {errors.message && <p className="text-xs text-rose-500">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 rounded-full bg-[#0070d5] hover:bg-[#005bb5] text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Submitting Inquiry...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Submit Inquiry</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information Cards (5 Cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* Direct Contacts */}
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-6">
                                <h3 className="text-lg font-bold text-[#101418]">Direct Channels</h3>
                                <div className="space-y-4 text-xs text-[#707473]">
                                    <div className="flex items-start space-x-3">
                                        <Mail className="w-5 h-5 text-[#0070d5] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-[#101418] block">Email Inquiries</span>
                                            <span>sales@aero-systems.test</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Phone className="w-5 h-5 text-[#0070d5] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-[#101418] block">Global Hotline</span>
                                            <span>+1 (800) 555-AERO (2376)</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-[#0070d5] shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-[#101418] block">Operating Hours</span>
                                            <span>Monday – Friday: 8:00 AM – 8:00 PM EST</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Global Headquarters */}
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-4">
                                <h3 className="text-lg font-bold text-[#101418]">Global Offices</h3>
                                <div className="space-y-3 text-xs text-[#707473] divide-y divide-gray-100">
                                    <div className="pt-2">
                                        <span className="font-bold text-[#101418] block">North America Technology Center</span>
                                        <span className="text-[#707473]">100 Innovation Parkway, Palo Alto, CA 94304, USA</span>
                                    </div>
                                    <div className="pt-3">
                                        <span className="font-bold text-[#101418] block">European Operations & Logistics</span>
                                        <span className="text-[#707473]">Am Hauptbahnhof 12, 60329 Frankfurt am Main, Germany</span>
                                    </div>
                                    <div className="pt-3">
                                        <span className="font-bold text-[#101418] block">Asia-Pacific Manufacturing Center</span>
                                        <span className="text-[#707473]">High-Tech Industrial Park, Nanshan, Shenzhen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
