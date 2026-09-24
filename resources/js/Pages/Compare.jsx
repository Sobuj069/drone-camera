import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { Check, X, ChevronRight, Box, ArrowRight, Sparkles, Scale } from 'lucide-react';

export default function Compare({ allProducts = [], selectedProducts = [] }) {
    const [selectedIds, setSelectedIds] = useState(
        selectedProducts.length > 0
            ? selectedProducts.map((p) => p.id)
            : allProducts.slice(0, 3).map((p) => p.id)
    );

    const activeDrones = allProducts.filter((p) => selectedIds.includes(p.id));

    const handleSelectChange = (slotIndex, newId) => {
        const next = [...selectedIds];
        next[slotIndex] = parseInt(newId);
        setSelectedIds(next);
    };

    const specKeys = [
        'Takeoff Weight',
        'Flight Time',
        'Camera Sensor',
        'Video Resolution',
        'Max Transmission Range',
        'Max Speed',
        'Obstacle Sensing',
        'Max Wind Resistance',
        'Internal Storage',
    ];

    return (
        <MainLayout>
            <Head title="Compare Camera Drones & Systems - AERO" />

            {/* Header */}
            <section className="py-16 bg-[#f5f6f8] border-b border-[#ebebeb] text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 text-[#0070d5] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Comparison Matrix</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-[#101418] tracking-tight">
                        Compare Drone Models
                    </h1>
                    <p className="text-sm sm:text-base text-[#707473] max-w-xl mx-auto font-light">
                        Evaluate flight duration, sensor dimensions, transmission reach, and obstacle detection to find your ideal aerial tool.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 bg-[#f5f6f8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-x-auto p-6 sm:p-10">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            {/* Product Selector Row */}
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="pb-8 text-xs font-bold uppercase tracking-wider text-[#707473] w-1/4">
                                        Select Models
                                    </th>
                                    {[0, 1, 2].map((slotIdx) => {
                                        const drone = activeDrones[slotIdx];
                                        return (
                                            <th key={slotIdx} className="pb-8 px-4 w-1/4 align-top">
                                                <div className="space-y-3">
                                                    <select
                                                        value={drone?.id || ''}
                                                        onChange={(e) => handleSelectChange(slotIdx, e.target.value)}
                                                        className="w-full bg-[#f5f6f8] border border-gray-200 text-[#101418] text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#0070d5] cursor-pointer"
                                                    >
                                                        {allProducts.map((p) => (
                                                             <option key={p.id} value={p.id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {drone && (
                                                        <div className="space-y-2">
                                                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f6f8]">
                                                                <img
                                                                    src={drone.thumbnail_url}
                                                                    alt={drone.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <h4 className="text-sm font-bold text-[#101418]">
                                                                {drone.name}
                                                            </h4>
                                                            <div className="text-base font-extrabold text-[#0070d5]">
                                                                ${Number(drone.price).toLocaleString()}
                                                            </div>
                                                            <Link
                                                                href={`/products/${drone.slug}`}
                                                                className="inline-flex items-center text-xs font-bold text-[#101418] hover:text-[#0070d5] transition-colors"
                                                            >
                                                                <span>3D Studio</span>
                                                                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>

                            {/* Comparison Spec Attributes */}
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {specKeys.map((key, kIdx) => (
                                    <tr key={kIdx} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-4 font-bold text-[#101418]">
                                            {key}
                                        </td>
                                        {[0, 1, 2].map((slotIdx) => {
                                            const drone = activeDrones[slotIdx];
                                            const val = drone?.specs ? drone.specs[key] || '—' : '—';
                                            return (
                                                <td key={slotIdx} className="py-4 px-4 text-[#707473] font-medium">
                                                    {val}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
