import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import HeroBannerSlider from '../Components/HeroBannerSlider';
import ProductCard2x2 from '../Components/ProductCard2x2';
import Home3DTeaser from '../Components/Home3DTeaser';
import CinematicParallax from '../Components/CinematicParallax';
import InnovationSection from '../Components/InnovationSection';
import FieldsExploreSection from '../Components/FieldsExploreSection';
import UtilityIconsRow from '../Components/UtilityIconsRow';
import VirtualFlightBar from '../Components/VirtualFlightBar';

export default function Home({
    banners = [],
    featuredProducts = [],
    showcaseProducts = [],
    innovationPosts = [],
    fieldCategories = [],
    flagship3dProduct = null,
}) {
    return (
        <MainLayout>
            <Head title="SM Gadgets Shop — Premium Drones, Cameras & Tech Gadgets" />

            {/* 1. Hero Multi-Slide Showcase */}
            <HeroBannerSlider banners={banners} />

            {/* 2. 2x2 Flagship Product Showcase Cards */}
            <ProductCard2x2 products={showcaseProducts} />

            {/* 3. Interactive 3D Drone Studio */}
            {flagship3dProduct && (
                <Home3DTeaser product={flagship3dProduct} />
            )}

            {/* 4. "Shot on DJI RS 5" Cinematic Showcase */}
            <CinematicParallax />

            {/* 5. "Standing at the Forefront of Innovation" Editorial */}
            <InnovationSection posts={innovationPosts} />

            {/* 6. "Explore DJI Products in Different Fields" */}
            <FieldsExploreSection categories={fieldCategories} />

            {/* 7. Service Quick Links (Where to Buy / Support / Fly Safe) */}
            <UtilityIconsRow />

            {/* 8. Virtual Flight Bar */}
            <VirtualFlightBar />
        </MainLayout>
    );
}
