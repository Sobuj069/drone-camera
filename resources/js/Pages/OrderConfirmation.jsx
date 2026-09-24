import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useCart } from '../Context/CartContext';
import {
    CheckCircle2,
    Package,
    Truck,
    MapPin,
    CreditCard,
    Printer,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    PhoneCall,
    Mail,
    Clock,
    Sparkles,
} from 'lucide-react';

export default function OrderConfirmation({ order }) {
    const { clearCart } = useCart();

    // Clear cart once order is confirmed
    useEffect(() => {
        clearCart();
    }, []);

    if (!order) {
        return (
            <MainLayout>
                <Head title="Order Not Found — SM Gadgets Shop" />
                <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Order Not Found</h1>
                        <p className="text-sm text-gray-500 mt-2">
                            The requested order could not be located.
                        </p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center gap-2 bg-[#0070d5] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const orderDate = order.created_at
        ? new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : 'Just now';

    const paymentMethodNames = {
        bkash: 'bKash Mobile Banking',
        nagad: 'Nagad Mobile Banking',
        rocket: 'Rocket Banking',
        cod: 'Cash on Delivery (COD)',
        card: 'Credit / Debit Card (SSL Gateway)',
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <MainLayout>
            <Head title={`Order Confirmation #${order.order_number} — SM Gadgets Shop`} />

            <div className="bg-[#f8f9fa] min-h-screen py-6 sm:py-12 print:bg-white print:py-0">
                <div className="max-w-[1100px] mx-auto px-3 sm:px-6 lg:px-8">
                    {/* Breadcrumbs (hidden on print) */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 print:hidden">
                        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <Link href="/products" className="hover:text-gray-900 transition">Products</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="font-semibold text-gray-900">Confirmation</span>
                    </nav>

                    {/* Success Header Banner */}
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs mb-6 text-center print:border-none print:shadow-none print:p-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm animate-in zoom-in-50 duration-300">
                            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-emerald-200/60">
                            <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight mb-2">
                            Thank You, {order.customer_name}!
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto mb-4">
                            Your order has been placed and is now being prepared for dispatch. We’ve sent a confirmation email to{' '}
                            <strong className="text-gray-900">{order.customer_email}</strong>.
                        </p>

                        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-xs font-medium text-gray-700">
                            <div>
                                Order Number: <span className="font-mono font-bold text-gray-950 text-sm">{order.order_number}</span>
                            </div>
                            <span className="text-gray-300 hidden sm:inline">&bull;</span>
                            <div>
                                Placed on: <span className="font-semibold text-gray-900">{orderDate}</span>
                            </div>
                        </div>

                        {/* Quick Action Buttons (hidden in print) */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                                <Printer className="w-4 h-4 text-gray-600" />
                                <span>Print Receipt / Invoice</span>
                            </button>

                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-[#0070d5] hover:bg-[#005bb5] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                            >
                                <span>Continue Shopping</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Order Tracking Progress Stepper (hidden on print) */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-6 print:hidden">
                        <h3 className="text-sm font-extrabold text-gray-950 mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#0070d5]" />
                            <span>Estimated Dispatch & Delivery Timeline</span>
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md mb-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-950">Order Placed</span>
                                <span className="text-[10px] text-emerald-600 font-semibold">Completed</span>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md mb-2 animate-pulse">
                                    <Package className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-950">Quality & Packing</span>
                                <span className="text-[10px] text-blue-600 font-semibold">In Progress</span>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center opacity-50">
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm mb-2">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-950">Flight Transit</span>
                                <span className="text-[10px] text-gray-500 font-semibold">Upcoming</span>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center opacity-50">
                                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm mb-2">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-950">Delivered</span>
                                <span className="text-[10px] text-gray-500 font-semibold">
                                    {order.delivery_method === 'express' ? '1-2 Business Days' : '3-5 Business Days'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left: Items Ordered List */}
                        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/80 shadow-xs print:border-none print:shadow-none print:p-0">
                            <h2 className="text-base sm:text-lg font-bold text-gray-950 tracking-tight mb-4 flex items-center justify-between">
                                <span>Items in this Order ({order.items?.length || 0})</span>
                            </h2>

                            <div className="divide-y divide-gray-100">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item) => (
                                        <div key={item.id} className="py-4 flex items-center gap-4">
                                            <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl p-1.5 shrink-0 border border-gray-100 flex items-center justify-center">
                                                <img
                                                    src={item.thumbnail_url || '/images/cards/card-dji-flip-hd.jpg'}
                                                    alt={item.product_name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-xs sm:text-sm text-gray-950 truncate">
                                                    {item.product_name}
                                                </h3>
                                                <div className="text-[11px] text-gray-500 mt-0.5">
                                                    Finish: <span className="text-gray-800 font-medium">{item.color || 'Standard'}</span> &bull; Qty: <strong className="text-gray-900 font-mono">{item.quantity}</strong>
                                                </div>
                                                <div className="text-xs font-semibold text-gray-600 mt-0.5">
                                                    ${parseFloat(item.unit_price).toLocaleString()} each
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm font-extrabold text-gray-950">
                                                    ${parseFloat(item.total_price).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500 py-4">No item details available.</p>
                                )}
                            </div>
                        </div>

                        {/* Right: Customer & Financial Summary */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs print:border-none print:shadow-none print:p-0">
                                <h3 className="text-base font-bold text-gray-950 mb-4">Payment & Totals</h3>

                                <div className="space-y-2.5 text-xs text-gray-600 pb-4 border-b border-gray-100">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-gray-900">${parseFloat(order.subtotal).toLocaleString()}</span>
                                    </div>

                                    {parseFloat(order.discount) > 0 && (
                                        <div className="flex justify-between text-emerald-600 font-semibold">
                                            <span>Discount</span>
                                            <span>-${parseFloat(order.discount).toLocaleString()}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span>Shipping ({order.delivery_method === 'express' ? 'Express VIP' : 'Standard'})</span>
                                        <span className="font-bold text-gray-900">
                                            {parseFloat(order.shipping_cost) === 0 ? (
                                                <span className="text-emerald-600">FREE</span>
                                            ) : (
                                                `$${parseFloat(order.shipping_cost).toLocaleString()}`
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="py-3 flex justify-between items-baseline border-b border-gray-100">
                                    <span className="text-sm font-black text-gray-950">Total Paid / Due</span>
                                    <span className="text-xl font-black text-[#0070d5]">
                                        ${parseFloat(order.total).toLocaleString()}
                                    </span>
                                </div>

                                <div className="pt-3 text-xs space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Payment Method:</span>
                                        <span className="font-semibold text-gray-900">
                                            {paymentMethodNames[order.payment_method] || order.payment_method}
                                        </span>
                                    </div>
                                    {order.transaction_id && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500">Transaction ID:</span>
                                            <span className="font-mono font-bold text-gray-900">
                                                {order.transaction_id}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Status:</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            order.payment_status === 'paid'
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            {order.payment_status === 'paid' ? 'Paid & Verified' : 'Pending Payment'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Destination Card */}
                            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs print:border-none print:shadow-none print:p-0">
                                <h3 className="text-base font-bold text-gray-950 mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#0070d5]" />
                                    <span>Shipping Destination</span>
                                </h3>

                                <div className="text-xs text-gray-600 space-y-1.5">
                                    <p className="font-bold text-gray-950 text-sm">{order.customer_name}</p>
                                    <p className="flex items-center gap-1.5 text-gray-700">
                                        <PhoneCall className="w-3 h-3 text-gray-400" /> {order.customer_phone}
                                    </p>
                                    <p className="flex items-center gap-1.5 text-gray-700">
                                        <Mail className="w-3 h-3 text-gray-400" /> {order.customer_email}
                                    </p>
                                    <div className="pt-2 border-t border-gray-100 mt-2 text-gray-800">
                                        <p>{order.shipping_address}</p>
                                        <p>
                                            {order.shipping_city}
                                            {order.shipping_division ? `, ${order.shipping_division}` : ''}
                                            {order.shipping_zip ? ` - ${order.shipping_zip}` : ''}
                                        </p>
                                    </div>
                                    {order.delivery_notes && (
                                        <p className="text-[11px] text-gray-500 italic pt-1">
                                            Note: "{order.delivery_notes}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
