import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useCart } from '../Context/CartContext';
import {
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ShoppingBag,
    ShieldCheck,
    Truck,
    RotateCcw,
    Tag,
    Check,
    ChevronRight,
} from 'lucide-react';

export default function Cart({ recommendedProducts = [] }) {
    const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [orderNote, setOrderNote] = useState('');

    const freeShippingThreshold = 500;
    const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
    const discountAmount = (subtotal * appliedDiscount) / 100;
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        setCouponError('');
        setCouponSuccess('');

        const code = couponCode.trim().toUpperCase();
        if (code === 'SM10' || code === 'DRONE10') {
            setAppliedDiscount(10);
            setCouponSuccess('10% discount applied successfully!');
        } else if (code === 'SM20') {
            setAppliedDiscount(20);
            setCouponSuccess('20% VIP discount applied!');
        } else {
            setCouponError('Invalid promo code. Try "SM10" for 10% off.');
        }
    };

    return (
        <MainLayout>
            <Head title="Shopping Cart — SM Gadgets Shop" />

            <div className="bg-[#f8f9fa] min-h-screen py-6 sm:py-10">
                <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
                        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="font-semibold text-gray-900">Shopping Cart</span>
                    </nav>

                    <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mb-2">
                        Your Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </h1>

                    {items.length === 0 ? (
                        /* Empty Cart View */
                        <div className="bg-white rounded-3xl p-8 sm:p-16 text-center border border-gray-200/80 shadow-xs my-6 max-w-xl mx-auto">
                            <div className="w-20 h-20 bg-blue-50 text-[#0070d5] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                                <ShoppingBag className="w-10 h-10" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is currently empty</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-sm mx-auto">
                                Looks like you haven't added any flagship drones or camera gear to your cart yet.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-[#0070d5] hover:bg-[#005bb5] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all"
                            >
                                <span>Discover Catalog</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        /* Cart Grid Layout */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6">
                            {/* Left Column: Cart Items List */}
                            <div className="lg:col-span-8 space-y-4">
                                {/* Free Shipping Progress Alert */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs">
                                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                                        <div className="flex items-center gap-1.5 text-gray-800">
                                            <Truck className="w-4 h-4 text-[#0070d5]" />
                                            {subtotal >= freeShippingThreshold ? (
                                                <span className="text-emerald-600 font-bold">You qualify for FREE Express Shipping! 🎉</span>
                                            ) : (
                                                <span>
                                                    Add <strong className="text-gray-950">${(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for FREE Shipping!
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-gray-400 font-mono text-[11px]">${subtotal.toLocaleString()} / ${freeShippingThreshold}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Items Container */}
                                <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden divide-y divide-gray-100">
                                    {items.map((item) => (
                                        <div
                                            key={item.cartItemId}
                                            className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                                        >
                                            {/* Item Image & Details */}
                                            <div className="flex items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
                                                <Link
                                                    href={`/products/${item.slug}`}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 bg-[#f8f9fa] rounded-2xl p-2 shrink-0 border border-gray-100 overflow-hidden flex items-center justify-center group-hover:border-blue-300 transition"
                                                >
                                                    <img
                                                        src={item.thumbnail_url || '/images/cards/card-dji-flip-hd.jpg'}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </Link>

                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/products/${item.slug}`}
                                                        className="font-bold text-sm sm:text-base text-gray-950 hover:text-[#0070d5] transition line-clamp-1 block"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <div className="text-xs text-gray-500 mt-0.5">
                                                        Finish: <span className="font-medium text-gray-700">{item.color}</span>
                                                    </div>
                                                    <div className="text-sm font-extrabold text-gray-900 mt-1">
                                                        ${item.price.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Controls & Line Total */}
                                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                                                {/* Counter */}
                                                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded-lg transition"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold font-mono text-gray-950">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded-lg transition"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Total Price */}
                                                <div className="text-right min-w-[80px]">
                                                    <div className="text-sm sm:text-base font-black text-gray-950 tracking-tight">
                                                        ${(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.cartItemId)}
                                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                                                    title="Remove item"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cart Controls Actions (Clear Cart / Continue Shopping) */}
                                <div className="flex items-center justify-between pt-2 text-xs">
                                    <button
                                        onClick={clearCart}
                                        className="text-gray-400 hover:text-rose-600 font-medium transition cursor-pointer"
                                    >
                                        Clear Entire Cart
                                    </button>
                                    <Link
                                        href="/products"
                                        className="text-[#0070d5] hover:underline font-semibold"
                                    >
                                        &larr; Continue Shopping
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column: Order Summary & Checkout Card */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs sticky top-24">
                                    <h3 className="text-lg font-extrabold text-gray-950 tracking-tight mb-4">
                                        Order Summary
                                    </h3>

                                    {/* Subtotal & Breakdown */}
                                    <div className="space-y-3 text-xs sm:text-sm text-gray-600 pb-4 border-b border-gray-100">
                                        <div className="flex justify-between">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                                        </div>

                                        {appliedDiscount > 0 && (
                                            <div className="flex justify-between text-emerald-600 font-semibold">
                                                <span>Discount ({appliedDiscount}%)</span>
                                                <span>-${discountAmount.toLocaleString()}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span>Estimated Shipping</span>
                                            <span className="font-semibold text-gray-900">
                                                {shippingCost === 0 ? (
                                                    <span className="text-emerald-600 font-bold">FREE</span>
                                                ) : (
                                                    `$${shippingCost}`
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-gray-500">
                                            <span>Estimated Tax / VAT</span>
                                            <span className="font-medium">Included</span>
                                        </div>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="py-4 flex justify-between items-baseline">
                                        <div>
                                            <span className="text-base font-extrabold text-gray-950 block">Grand Total</span>
                                            <span className="text-[11px] text-gray-400">All local taxes & duties included</span>
                                        </div>
                                        <div className="text-xl sm:text-2xl font-black text-[#0070d5] tracking-tight">
                                            ${grandTotal.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Promo Code Box */}
                                    <form onSubmit={handleApplyCoupon} className="mb-4">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    placeholder="Promo Code (e.g. SM10)"
                                                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0070d5] uppercase font-mono"
                                                />
                                                <Tag className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold transition"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponSuccess && (
                                            <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                                                <Check className="w-3 h-3" /> {couponSuccess}
                                            </p>
                                        )}
                                        {couponError && (
                                            <p className="text-[11px] text-rose-500 mt-1.5">{couponError}</p>
                                        )}
                                    </form>

                                    {/* Checkout CTA */}
                                    <Link
                                        href="/checkout"
                                        className="w-full bg-[#0070d5] hover:bg-[#005bb5] text-white py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-98"
                                    >
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>

                                    {/* Trust Badges */}
                                    <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5 text-[11px] text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>256-Bit SSL Secure Encrypted Checkout</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                                            <span>7-Day Hassle-Free Replacement Policy</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                                            <span>Official Warranty & Genuine Guarantee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
