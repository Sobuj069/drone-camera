import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Footer() {
    const { data, setData, post, processing, reset, recentlySuccessful } = useForm({
        email: '',
    });

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!data.email) return;
        post('/newsletter', {
            preserveScroll: true,
            onSuccess: () => reset('email'),
        });
    };

    return (
        <footer className="bg-[#101418] text-[#8c9094] text-xs pt-12 pb-24" data-purpose="main-footer">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Multi-column link directory */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 pb-12 border-b border-[#21262d]">
                    {/* Column 1: Product Categories & Service Plans */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Product Categories</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/products?category=camera-drones">Consumer</Link></li>
                                <li><Link className="hover:text-white transition" href="/products?category=camera-drones">Professional</Link></li>
                                <li><Link className="hover:text-white transition" href="/products?category=enterprise">Enterprise</Link></li>
                                <li><Link className="hover:text-white transition" href="/products?category=power">Components</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Service Plans</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/support">DJI Care Refresh</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">DJI Care Pro</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">DJI Care Enterprise</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">DJI Maintenance Program</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Where to Buy & Cooperation */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Where to Buy</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/products">DJI Online Store</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Flagship Stores</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">DJI-Operated Stores</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Retail Stores</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Enterprise Retailers</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Agricultural Drone Dealer</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Delivery Drone Dealer</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Pro Retailers</Link></li>
                                <li><Link className="hover:text-white transition" href="/products">DJI Store App</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Cooperation</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/contact">Become a Dealer</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Apply For Authorized Store</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Fly Safe & Support */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Fly Safe</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/support">Fly Safe</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">DJI Flying Tips</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Support</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><Link className="hover:text-white transition" href="/support">Product Support</Link></li>
                                <li><Link className="hover:text-white transition" href="/contact">Service Request and Inquiry</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">Help Center</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">After-Sales Service Policies</Link></li>
                                <li><Link className="hover:text-white transition" href="/support">Download Center</Link></li>
                                <li><Link className="hover:text-white transition" href="/about">Security and Privacy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Explore */}
                    <div>
                        <h4 className="text-white text-xs font-semibold mb-3">Explore</h4>
                        <ul className="space-y-2 text-[#8c9094]">
                            <li><Link className="hover:text-white transition" href="/news">Media Center</Link></li>
                            <li><Link className="hover:text-white transition" href="/compare">Buying Guides</Link></li>
                            <li><Link className="hover:text-white transition" href="/about">DJI Trust Center</Link></li>
                            <li><Link className="hover:text-white transition" href="/news">DJI Blog</Link></li>
                            <li><a className="text-[#0070d5] hover:underline transition" href="/admin">Admin Portal &rarr;</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Trending Now */}
                    <div>
                        <h4 className="text-white text-xs font-semibold mb-3">Trending Now</h4>
                        <ul className="space-y-2 text-[#8c9094]">
                            <li><Link className="hover:text-white transition" href="/products/aero-osmo-mobile-8">Phone Gimbals</Link></li>
                            <li><Link className="hover:text-white transition" href="/products/aero-inspire-cinema-3">Camera Gimbals</Link></li>
                            <li><Link className="hover:text-white transition" href="/products/aero-neo-360">Action Cameras</Link></li>
                            <li><Link className="hover:text-white transition" href="/products">Wireless Microphones</Link></li>
                            <li><Link className="hover:text-white transition" href="/products?category=power">Portable Power Stations</Link></li>
                            <li><Link className="hover:text-white transition" href="/products/aero-neo-360">Vlog Cameras</Link></li>
                        </ul>
                    </div>

                    {/* Column 6: Community & Subscribe */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-3">Community</h4>
                            <ul className="space-y-2 text-[#8c9094]">
                                <li><a className="hover:text-white transition" href="#">SkyPixel</a></li>
                                <li><a className="hover:text-white transition" href="#">DJI Forum</a></li>
                                <li><a className="hover:text-white transition" href="#">Developer</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-semibold mb-1.5">Subscribe</h4>
                            <p className="text-[11px] text-[#707473] mb-2.5">Get the latest news from DJI</p>
                            {/* Subscribe Input */}
                            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                                <input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-[#1b2026] text-white placeholder-[#505459] border border-[#2b313a] rounded-sm py-1.5 px-3 text-xs focus:outline-none focus:border-[#0070d5] pr-8"
                                    placeholder="Your email address"
                                    type="email"
                                    required
                                />
                                <button
                                    aria-label="Submit newsletter subscription"
                                    className="absolute right-2 text-[#8c9094] hover:text-white disabled:opacity-50"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>
                            </form>
                            {recentlySuccessful && (
                                <p className="text-[11px] text-emerald-400 mt-1">Subscribed successfully!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Media & Payment Gateways Trust Bar */}
                <div className="py-6 border-b border-[#21262d] flex flex-col xl:flex-row items-center justify-between gap-6">
                    {/* Left: Solid Colorful Social Media Icons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3.5">
                        <span className="text-[#8c9094] text-xs font-semibold uppercase tracking-wider">Follow DJI:</span>
                        <div className="flex items-center space-x-2.5">
                            {/* Facebook */}
                            <a
                                href="https://facebook.com/dji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#1877f2]/30 hover:brightness-110"
                                aria-label="Facebook"
                                title="Facebook"
                            >
                                <img src="/images/social/facebook.svg" alt="Facebook" className="w-full h-full object-cover block" />
                            </a>
                            {/* Messenger */}
                            <a
                                href="https://m.me/dji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#0099ff]/30 hover:brightness-110"
                                aria-label="Messenger"
                                title="Messenger"
                            >
                                <img src="/images/social/messenger.svg" alt="Messenger" className="w-full h-full object-cover block" />
                            </a>
                            {/* YouTube */}
                            <a
                                href="https://youtube.com/dji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#ff0000]/30 hover:brightness-110"
                                aria-label="YouTube"
                                title="YouTube"
                            >
                                <img src="/images/social/youtube.svg" alt="YouTube" className="w-full h-full object-cover block" />
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://instagram.com/dji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#e1306c]/30 hover:brightness-110"
                                aria-label="Instagram"
                                title="Instagram"
                            >
                                <img src="/images/social/instagram.svg" alt="Instagram" className="w-full h-full object-cover block" />
                            </a>
                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/company/dji"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#0077b5]/30 hover:brightness-110"
                                aria-label="LinkedIn"
                                title="LinkedIn"
                            >
                                <img src="/images/social/linkedin.svg" alt="LinkedIn" className="w-full h-full object-cover block" />
                            </a>
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9.5 h-9.5 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md shadow-[#25d366]/30 hover:brightness-110"
                                aria-label="WhatsApp"
                                title="WhatsApp"
                            >
                                <img src="/images/social/whatsapp.svg" alt="WhatsApp" className="w-full h-full object-cover block" />
                            </a>
                        </div>
                    </div>

                    {/* Right: Payment Gateways & MFS Badges */}
                    <div className="flex flex-col sm:flex-row items-center gap-3.5">
                        <span className="text-[#8c9094] text-xs font-semibold uppercase tracking-wider">Secured Payments:</span>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                            {/* 1. bKash */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="bKash MFS">
                                <img src="/images/payments/bkash.png" alt="bKash" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 2. Nagad */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="Nagad MFS">
                                <img src="/images/payments/nagad.png" alt="Nagad" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 3. DBBL Rocket */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="DBBL Rocket">
                                <img src="/images/payments/rocket.png" alt="Rocket" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 4. SureCash */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="SureCash">
                                <img src="/images/payments/surecash.png" alt="SureCash" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 5. Upay */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="Upay MFS">
                                <img src="/images/payments/upay.png" alt="Upay" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 6. MCash */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="MCash Islami Bank">
                                <img src="/images/payments/mcash.png" alt="MCash" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 7. Visa */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="Visa">
                                <img src="/images/payments/visa.png" alt="Visa" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 8. Mastercard */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="Mastercard">
                                <img src="/images/payments/mastercard.png" alt="Mastercard" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                            {/* 9. American Express */}
                            <div className="hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md cursor-pointer rounded-lg overflow-hidden" title="American Express">
                                <img src="/images/payments/amex.png" alt="American Express" className="h-7.5 sm:h-8 w-auto object-contain block" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Sub-footer */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#606469]">
                    <p>Copyright © 2026 DJI All Rights Reserved.</p>
                    <div className="flex items-center space-x-4 mt-3 md:mt-0">
                        <Link className="hover:text-gray-400" href="/about">DJI Privacy Policy</Link>
                        <span>|</span>
                        <Link className="hover:text-gray-400" href="/about">Use of Cookies</Link>
                        <span>|</span>
                        <Link className="hover:text-gray-400" href="/about">Terms of Use</Link>
                        <span>|</span>
                        <Link className="hover:text-gray-400" href="/about">Business Information</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
