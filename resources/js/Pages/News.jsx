import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { ChevronRight, Calendar, Clock, Newspaper, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function News({ posts = [] }) {
    const featured = posts[0];
    const gridPosts = posts.slice(1);

    return (
        <MainLayout>
            <Head title="Newsroom & Innovation Stories - AERO" />

            {/* Header */}
            <section className="py-20 bg-[#f5f6f8] border-b border-[#ebebeb]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                        AERO Newsroom
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black text-[#101418] tracking-tight">
                        Innovation & Stories
                    </h1>
                    <p className="text-[#707473] max-w-2xl mx-auto text-sm sm:text-base font-light">
                        Explore press announcements, groundbreaking engineering milestones, and cinematic customer stories.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-[#f5f6f8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {/* Featured Top Story */}
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-blue-400 transition-all duration-500 shadow-md hover:shadow-xl"
                        >
                            <Link href={`/news/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-12">
                                <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-gray-100">
                                    <img
                                        src={featured.image_url}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center space-y-4">
                                    <div className="flex items-center space-x-3 text-xs text-[#707473]">
                                        <span className="text-[#0070d5] font-bold uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                            {featured.category_tag}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {featured.read_time}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-black text-[#101418] group-hover:text-[#0070d5] transition-colors leading-tight">
                                        {featured.title}
                                    </h2>

                                    <p className="text-xs sm:text-sm text-[#707473] font-light line-clamp-3">
                                        {featured.excerpt || featured.subtitle}
                                    </p>

                                    <div className="pt-4 flex items-center text-sm font-bold text-[#0070d5] group-hover:translate-x-1 transition-transform">
                                        <span>Read Full Article</span>
                                        <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Stories Grid */}
                    {gridPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridPosts.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="group rounded-3xl bg-white border border-gray-200 hover:border-blue-400 overflow-hidden flex flex-col transition-all shadow-sm hover:shadow-lg"
                                >
                                    <Link href={`/news/${post.slug}`} className="flex flex-col h-full">
                                        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1 space-y-3">
                                            <div className="flex items-center space-x-2 text-[11px] text-[#707473]">
                                                <span className="text-[#0070d5] font-semibold">{post.category_tag}</span>
                                                <span>•</span>
                                                <span>{post.read_time}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-[#101418] group-hover:text-[#0070d5] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-xs text-[#707473] line-clamp-2 mt-auto">
                                                {post.excerpt || post.subtitle}
                                            </p>

                                            <div className="pt-2 text-xs font-semibold text-[#0070d5] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                <span>Read More</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
