import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useCart } from '../Context/CartContext';
import {
    ShieldCheck,
    Truck,
    CreditCard,
    Banknote,
    Lock,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    ShoppingBag,
} from 'lucide-react';

export default function Checkout({ errors = {} }) {
    const { items, subtotal, totalItems } = useCart();

    const [form, setForm] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        shipping_city: 'Dhaka',
        shipping_division: 'Dhaka',
        shipping_zip: '',
        delivery_notes: '',
        delivery_method: 'standard', // standard | express
        payment_method: 'bkash', // bkash | nagad | rocket | cod | card
        transaction_id: '',
    });

    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [couponError, setCouponError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientErrors, setClientErrors] = useState({});

    // Delivery method calculations
    const shippingCost =
        form.delivery_method === 'express' ? 15 : subtotal >= 500 || subtotal === 0 ? 0 : 25;
    const discountAmount = (subtotal * appliedDiscount) / 100;
    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        setCouponError('');
        setCouponSuccess('');
        const code = couponCode.trim().toUpperCase();
        if (code === 'SM10' || code === 'DRONE10') {
            setAppliedDiscount(10);
            setCouponSuccess('10% promo discount applied!');
        } else if (code === 'SM20') {
            setAppliedDiscount(20);
            setCouponSuccess('20% VIP promo discount applied!');
        } else {
            setCouponError('Invalid code. Use "SM10" for 10% off.');
        }
    };

    const validateForm = () => {
        const errs = {};
        if (!form.customer_name.trim()) errs.customer_name = 'Full name is required';
        if (!form.customer_email.trim() || !/\S+@\S+\.\S+/.test(form.customer_email))
            errs.customer_email = 'A valid email address is required';
        if (!form.customer_phone.trim()) errs.customer_phone = 'Contact phone number is required';
        if (!form.shipping_address.trim()) errs.shipping_address = 'Street address is required';
        if (!form.shipping_city.trim()) errs.shipping_city = 'City is required';

        if (['bkash', 'nagad', 'rocket'].includes(form.payment_method)) {
            if (!form.transaction_id.trim()) {
                errs.transaction_id = 'Please provide the Transaction ID (TrxID) after payment';
            }
        }

        setClientErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (items.length === 0) return;
        if (!validateForm()) return;

        setIsSubmitting(true);

        const payload = {
            customer_name: form.customer_name,
            customer_email: form.customer_email,
            customer_phone: form.customer_phone,
            shipping_address: form.shipping_address,
            shipping_city: form.shipping_city,
            shipping_division: form.shipping_division,
            shipping_zip: form.shipping_zip,
            delivery_notes: form.delivery_notes,
            delivery_method: form.delivery_method,
            payment_method: form.payment_method,
            transaction_id: form.transaction_id || null,
            items: items.map((i) => ({
                id: i.id,
                name: i.name,
                slug: i.slug,
                price: i.price,
                quantity: i.quantity,
                thumbnail_url: i.thumbnail_url || i.image_url,
                color: i.color,
            })),
            subtotal: subtotal,
            shipping_cost: shippingCost,
            discount: discountAmount,
            total: grandTotal,
        };

        router.post('/checkout', payload, {
            onFinish: () => setIsSubmitting(false),
            onError: (serverErrors) => {
                setClientErrors(serverErrors);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
        });
    };

    if (items.length === 0) {
        return (
            <MainLayout>
                <Head title="Checkout — SM Gadgets Shop" />
                <div className="bg-[#f8f9fa] min-h-[70vh] flex items-center justify-center py-16 px-4">
                    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200/80 shadow-sm max-w-md w-full">
                        <div className="w-16 h-16 bg-blue-50 text-[#0070d5] rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6">
                            You need to add products to your cart before proceeding to checkout.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center w-full bg-[#0070d5] hover:bg-[#005bb5] text-white py-3 rounded-2xl text-xs sm:text-sm font-bold transition"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Secure Checkout — SM Gadgets Shop" />

            <div className="bg-[#f8f9fa] min-h-screen py-6 sm:py-10">
                <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
                    {/* Breadcrumb navigation */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
                        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <Link href="/cart" className="hover:text-gray-900 transition">Cart</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="font-semibold text-gray-900">Checkout</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                                Secure Checkout
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Complete your order with encrypted payments and guaranteed dispatch.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold self-start md:self-auto border border-emerald-200">
                            <Lock className="w-3.5 h-3.5" />
                            <span>256-Bit SSL Encrypted & Protected</span>
                        </div>
                    </div>

                    {/* Form & Overview Grid */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Left Column: Information, Shipping & Payment */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Contact Information Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-xs">
                                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0070d5] flex items-center justify-center font-bold text-sm">
                                        1
                                    </div>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                        Customer Contact Information
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={form.customer_name}
                                            onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                                            placeholder="e.g. John Doe / Sobuj Khan"
                                            className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                        />
                                        {(clientErrors.customer_name || errors.customer_name) && (
                                            <p className="text-[11px] text-rose-500 mt-1">
                                                {clientErrors.customer_name || errors.customer_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Email Address <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={form.customer_email}
                                            onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                                            placeholder="you@example.com"
                                            className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                        />
                                        {(clientErrors.customer_email || errors.customer_email) && (
                                            <p className="text-[11px] text-rose-500 mt-1">
                                                {clientErrors.customer_email || errors.customer_email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Phone Number <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={form.customer_phone}
                                            onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                                            placeholder="+880 1700-000000"
                                            className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                        />
                                        {(clientErrors.customer_phone || errors.customer_phone) && (
                                            <p className="text-[11px] text-rose-500 mt-1">
                                                {clientErrors.customer_phone || errors.customer_phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Shipping & Delivery Address Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-xs">
                                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0070d5] flex items-center justify-center font-bold text-sm">
                                        2
                                    </div>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                        Delivery Address & Method
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Street / Flat / House Address <span className="text-rose-500">*</span>
                                        </label>
                                        <textarea
                                            rows={2}
                                            required
                                            value={form.shipping_address}
                                            onChange={(e) => setForm({ ...form, shipping_address: e.target.value })}
                                            placeholder="House No, Road No, Sector / Area"
                                            className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                        />
                                        {(clientErrors.shipping_address || errors.shipping_address) && (
                                            <p className="text-[11px] text-rose-500 mt-1">
                                                {clientErrors.shipping_address || errors.shipping_address}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                City / District <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.shipping_city}
                                                onChange={(e) => setForm({ ...form, shipping_city: e.target.value })}
                                                placeholder="Dhaka"
                                                className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Division / State
                                            </label>
                                            <select
                                                value={form.shipping_division}
                                                onChange={(e) => setForm({ ...form, shipping_division: e.target.value })}
                                                className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                            >
                                                <option value="Dhaka">Dhaka</option>
                                                <option value="Chattogram">Chattogram</option>
                                                <option value="Rajshahi">Rajshahi</option>
                                                <option value="Sylhet">Sylhet</option>
                                                <option value="Khulna">Khulna</option>
                                                <option value="Barishal">Barishal</option>
                                                <option value="Rangpur">Rangpur</option>
                                                <option value="Mymensingh">Mymensingh</option>
                                                <option value="International">International Delivery</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Postal / ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                value={form.shipping_zip}
                                                onChange={(e) => setForm({ ...form, shipping_zip: e.target.value })}
                                                placeholder="1212"
                                                className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Speed Options */}
                                    <div className="pt-2">
                                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                                            Choose Delivery Speed
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <label
                                                className={`flex items-start p-3.5 rounded-2xl border cursor-pointer transition ${
                                                    form.delivery_method === 'standard'
                                                        ? 'border-[#0070d5] bg-blue-50/40 ring-1 ring-[#0070d5]'
                                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="delivery_method"
                                                    value="standard"
                                                    checked={form.delivery_method === 'standard'}
                                                    onChange={() => setForm({ ...form, delivery_method: 'standard' })}
                                                    className="mt-0.5 text-[#0070d5] focus:ring-[#0070d5]"
                                                />
                                                <div className="ml-3">
                                                    <div className="text-xs font-bold text-gray-900 flex items-center justify-between">
                                                        <span>Standard Shipping</span>
                                                        <span className="text-emerald-600 font-extrabold">
                                                            {subtotal >= 500 ? 'FREE' : '$25'}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                                        Delivered within 3-5 business days with live tracking.
                                                    </p>
                                                </div>
                                            </label>

                                            <label
                                                className={`flex items-start p-3.5 rounded-2xl border cursor-pointer transition ${
                                                    form.delivery_method === 'express'
                                                        ? 'border-[#0070d5] bg-blue-50/40 ring-1 ring-[#0070d5]'
                                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="delivery_method"
                                                    value="express"
                                                    checked={form.delivery_method === 'express'}
                                                    onChange={() => setForm({ ...form, delivery_method: 'express' })}
                                                    className="mt-0.5 text-[#0070d5] focus:ring-[#0070d5]"
                                                />
                                                <div className="ml-3">
                                                    <div className="text-xs font-bold text-gray-900 flex items-center justify-between">
                                                        <span>Express Priority VIP</span>
                                                        <span className="text-blue-600 font-extrabold">+$15</span>
                                                    </div>
                                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                                        Next-day priority flight dispatch & dedicated courier.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Order Notes */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Order Notes / Instructions (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.delivery_notes}
                                            onChange={(e) => setForm({ ...form, delivery_notes: e.target.value })}
                                            placeholder="e.g. Call before delivery, fragile packaging request"
                                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:border-[#0070d5] transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Options Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-xs">
                                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0070d5] flex items-center justify-center font-bold text-sm">
                                        3
                                    </div>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                                        Payment Method
                                    </h2>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                                    {/* bKash */}
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, payment_method: 'bkash' })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                                            form.payment_method === 'bkash'
                                                ? 'border-[#E2136E] bg-pink-50/50 ring-2 ring-[#E2136E]/40 text-gray-950 font-bold'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                                        }`}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-xs mb-1.5 shadow-xs">
                                            bK
                                        </div>
                                        <span className="text-xs">bKash</span>
                                        <span className="text-[10px] text-gray-400">Mobile Pay</span>
                                    </button>

                                    {/* Nagad */}
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, payment_method: 'nagad' })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                                            form.payment_method === 'nagad'
                                                ? 'border-[#F7941D] bg-orange-50/50 ring-2 ring-[#F7941D]/40 text-gray-950 font-bold'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                                        }`}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-[#F7941D] text-white flex items-center justify-center font-black text-xs mb-1.5 shadow-xs">
                                            Ng
                                        </div>
                                        <span className="text-xs">Nagad</span>
                                        <span className="text-[10px] text-gray-400">Mobile Pay</span>
                                    </button>

                                    {/* Cash on Delivery */}
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, payment_method: 'cod' })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                                            form.payment_method === 'cod'
                                                ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/40 text-gray-950 font-bold'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                                        }`}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs">
                                            <Banknote className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs">Cash on Delivery</span>
                                        <span className="text-[10px] text-gray-400">Pay at Door</span>
                                    </button>

                                    {/* Card Payment */}
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, payment_method: 'card' })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
                                            form.payment_method === 'card'
                                                ? 'border-[#0070d5] bg-blue-50/50 ring-2 ring-[#0070d5]/40 text-gray-950 font-bold'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                                        }`}
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-[#0070d5] text-white flex items-center justify-center font-bold text-xs mb-1.5 shadow-xs">
                                            <CreditCard className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs">Card Payment</span>
                                        <span className="text-[10px] text-gray-400">Visa / Master</span>
                                    </button>
                                </div>

                                {/* Payment Details Box based on choice */}
                                {['bkash', 'nagad', 'rocket'].includes(form.payment_method) && (
                                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-200/80 space-y-3">
                                        <div className="flex items-start gap-2.5 text-xs text-gray-700">
                                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    Send Money / Merchant Payment Instructions:
                                                </p>
                                                <p className="mt-1">
                                                    1. Transfer <strong>${grandTotal.toLocaleString()}</strong> to our official{' '}
                                                    <span className="uppercase font-bold text-gray-950">
                                                        {form.payment_method}
                                                    </span>{' '}
                                                    Merchant Number: <strong className="font-mono text-blue-600">01700-123456</strong>
                                                </p>
                                                <p>2. Enter your Transaction ID (TrxID) below for verification.</p>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Transaction ID (TrxID) <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.transaction_id}
                                                onChange={(e) => setForm({ ...form, transaction_id: e.target.value })}
                                                placeholder="e.g. 9J829X82LA"
                                                className="w-full text-xs sm:text-sm bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#0070d5] uppercase font-mono tracking-wider font-bold"
                                            />
                                            {(clientErrors.transaction_id || errors.transaction_id) && (
                                                <p className="text-[11px] text-rose-500 mt-1">
                                                    {clientErrors.transaction_id || errors.transaction_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {form.payment_method === 'cod' && (
                                    <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                        <div className="text-xs text-emerald-950">
                                            <p className="font-bold">Cash on Delivery Selected</p>
                                            <p className="text-emerald-800 mt-0.5">
                                                Pay in cash directly to our logistics delivery representative when your drone arrives at your doorstep. Inspect package before receiving.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {form.payment_method === 'card' && (
                                    <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 flex items-start gap-3">
                                        <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div className="text-xs text-blue-950">
                                            <p className="font-bold">SSLCommerz / Card Gateway</p>
                                            <p className="text-blue-800 mt-0.5">
                                                Your card details are 3D-Secure authenticated with OTP verification.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Sticky Order Summary & Pay CTA */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs sticky top-24">
                                <h3 className="text-base sm:text-lg font-black text-gray-950 tracking-tight mb-4 flex items-center justify-between">
                                    <span>Order Summary</span>
                                    <span className="text-xs font-normal text-gray-500 font-sans">
                                        ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                                    </span>
                                </h3>

                                {/* Mini items list */}
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100 mb-4">
                                    {items.map((item) => (
                                        <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl p-1 shrink-0 border border-gray-100 flex items-center justify-center">
                                                <img
                                                    src={item.thumbnail_url || '/images/cards/card-dji-flip-hd.jpg'}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                                    {item.name}
                                                </h4>
                                                <div className="text-[11px] text-gray-500">
                                                    Qty: {item.quantity} &bull; {item.color}
                                                </div>
                                            </div>
                                            <div className="text-xs font-extrabold text-gray-950">
                                                ${(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Promo Code */}
                                <div className="pt-3 border-t border-gray-100 mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Promo Code"
                                            className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 uppercase font-mono"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl font-bold hover:bg-black transition shrink-0 cursor-pointer"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponSuccess && (
                                        <p className="text-[11px] text-emerald-600 font-medium mt-1">
                                            {couponSuccess}
                                        </p>
                                    )}
                                    {couponError && (
                                        <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>
                                    )}
                                </div>

                                {/* Financial Calculations */}
                                <div className="space-y-2.5 text-xs text-gray-600 pb-4 border-b border-gray-100">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                                    </div>
                                    {appliedDiscount > 0 && (
                                        <div className="flex justify-between text-emerald-600 font-semibold">
                                            <span>Promo Discount ({appliedDiscount}%)</span>
                                            <span>-${discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span>Delivery ({form.delivery_method === 'express' ? 'Express' : 'Standard'})</span>
                                        <span className="font-bold text-gray-900">
                                            {shippingCost === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingCost}`}
                                        </span>
                                    </div>
                                </div>

                                {/* Grand Total */}
                                <div className="py-4 flex justify-between items-baseline">
                                    <div>
                                        <span className="text-sm font-extrabold text-gray-950 block">Grand Total</span>
                                        <span className="text-[10px] text-gray-400">Includes all taxes & warranty</span>
                                    </div>
                                    <div className="text-xl sm:text-2xl font-black text-[#0070d5] tracking-tight">
                                        ${grandTotal.toLocaleString()}
                                    </div>
                                </div>

                                {/* Submit Order Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-white transition-all shadow-lg cursor-pointer ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#0070d5] hover:bg-[#005bb5] shadow-blue-500/20 active:scale-98'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Processing Order...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Place Order (${grandTotal.toLocaleString()})</span>
                                        </>
                                    )}
                                </button>

                                <div className="mt-4 text-center">
                                    <Link
                                        href="/cart"
                                        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition font-medium"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Back to Shopping Cart</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
