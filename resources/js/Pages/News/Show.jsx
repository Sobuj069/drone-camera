import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { ChevronLeft, Clock, Calendar, Share2, ArrowRight } from 'lucide-react';

export default function Show({ post, relatedPosts = [] }) {
    return (
        <MainLayout>
            <Head title={`${post.title} - AERO Newsroom`} />

            <article className="py-16 sm:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <div className="mb-8">
                        <Link
                            href="/news"
                            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#707473] hover:text-[#0070d5] transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Back to Newsroom</span>
                        </Link>
                    </div>

                    {/* Article Header */}
                    <div className="space-y-4 mb-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#0070d5] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                            {post.category_tag}
                        </span>

                        <h1 className="text-3xl sm:text-5xl font-black text-[#101418] tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        {post.subtitle && (
                            <p className="text-lg sm:text-xl text-[#707473] font-light">
                                {post.subtitle}
                            </p>
                        )}

                        <div className="flex items-center space-x-4 pt-2 text-xs text-[#707473] border-t border-gray-200">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#0070d5]" />
                                {post.read_time}
                            </span>
                            <span>•</span>
                            <span>Published {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-xl bg-gray-100 border border-gray-200">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Body Content */}
                    <div className="max-w-none text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg font-normal">
                        {post.content ? (
                            post.content.split('\n\n').map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))
                        ) : (
                            <p>{post.excerpt}</p>
                        )}
                    </div>

                    {/* Related Articles */}
                    {relatedPosts && relatedPosts.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-[#101418] mb-6">
                                More from AERO Stories
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {relatedPosts.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        href={`/news/${rel.slug}`}
                                        className="group rounded-2xl bg-[#f5f6f8] border border-gray-200 hover:border-blue-400 p-5 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <h4 className="text-sm font-bold text-[#101418] group-hover:text-[#0070d5] transition-colors">
                                            {rel.title}
                                        </h4>
                                        <span className="text-xs text-[#707473] block mt-1">
                                            {rel.category_tag} • {rel.read_time}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </MainLayout>
    );
}
