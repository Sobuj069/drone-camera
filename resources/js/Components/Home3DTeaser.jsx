import React from 'react';
import ProductViewer3D from './ProductViewer3D';

export default function Home3DTeaser({ product }) {
    if (!product) return null;

    return (
        <section className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 select-none" data-purpose="interactive-3d-studio">
            <ProductViewer3D product={product} />
        </section>
    );
}
