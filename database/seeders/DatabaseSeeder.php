<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Inquiry;
use App\Models\NewsletterSubscriber;
use App\Models\Post;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key checks for clean re-seeding
        Schema::disableForeignKeyConstraints();
        Product::truncate();
        Category::truncate();
        Banner::truncate();
        Post::truncate();
        NewsletterSubscriber::truncate();
        Inquiry::truncate();
        Schema::enableForeignKeyConstraints();

        // 1. Create Admin User for Filament
        User::firstOrCreate(
            ['email' => 'admin@drone.test'],
            [
                'name' => 'SM Gadgets Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Categories
        $catCameraDrones = Category::create([
            'name' => 'Camera Drones',
            'slug' => 'camera-drones',
            'tagline' => 'Capture the Extraordinary from Above',
            'description' => 'Flagship camera drones equipped with Hasselblad sensors, omnidirectional obstacle avoidance, and long-range transmission.',
            'image_url' => '/images/products/mavic-4-pro.jpg',
            'icon' => 'Drone',
            'order' => 1,
            'is_active' => true,
        ]);

        $catHandheld = Category::create([
            'name' => 'Handheld & Gimbals',
            'slug' => 'handheld',
            'tagline' => 'Unshakable Cinematic Stabilization',
            'description' => 'Smartphone stabilizers, pocket cameras, and professional cinema gimbals designed for fluid movement.',
            'image_url' => '/images/products/osmo-mobile-8.jpg',
            'icon' => 'Camera',
            'order' => 2,
            'is_active' => true,
        ]);

        $catEnterprise = Category::create([
            'name' => 'Commercial & Enterprise',
            'slug' => 'enterprise',
            'tagline' => 'Industrial Intelligence & Thermal Mapping',
            'description' => 'Commercial aerial solutions engineered for infrastructure inspection, public safety, surveying, and energy grids.',
            'image_url' => '/images/products/matrice-350.png',
            'icon' => 'Cpu',
            'order' => 3,
            'is_active' => true,
        ]);

        $catAgriculture = Category::create([
            'name' => 'Precision Agriculture',
            'slug' => 'agriculture',
            'tagline' => 'Intelligent Spraying & Crop Protection',
            'description' => 'High-capacity agricultural drones delivering precise spraying, granule spreading, and multispectral field mapping.',
            'image_url' => '/images/products/agras-t50.png',
            'icon' => 'Leaf',
            'order' => 4,
            'is_active' => true,
        ]);

        $catPower = Category::create([
            'name' => 'Power & Charging',
            'slug' => 'power',
            'tagline' => 'Portable Energy & Fast Charging Stations',
            'description' => 'Ultra-fast portable power stations and solar generators for off-grid outdoor filmmaking and expedition power.',
            'image_url' => '/images/products/powerstation-2000.png',
            'icon' => 'Zap',
            'order' => 5,
            'is_active' => true,
        ]);

        // 3. Products with 100% Clean Studio Background Images
        Product::create([
            'category_id' => $catCameraDrones->id,
            'name' => 'AERO Mavic 4 Pro',
            'slug' => 'aero-mavic-4-pro',
            'tagline' => 'Inspiration in Focus',
            'subtitle' => 'Tri-Camera Hasselblad Optical System with 46-Min Flight Time & 20km O4 Transmission',
            'badge' => 'Triple-Lens Flagship',
            'price' => 2199.00,
            'original_price' => 2499.00,
            'description' => "The AERO Mavic 4 Pro initiates a new era of aerial imaging by housing three sensors and focal lengths into one compact airborne marvel. Equipped with a 4/3 CMOS Hasselblad camera and dual telephoto cameras, Mavic 4 Pro unlocks unprecedented creative perspectives, allowing you to capture stunning landscapes, explore photographic storytelling, and build cinematic masterpieces with unrivaled optical fidelity.",
            'overview_features' => [
                ['title' => '4/3 CMOS Hasselblad Sensor', 'stat' => '20MP / 5.1K', 'desc' => 'Supports 12.8 stops of native dynamic range and natural color reproduction.'],
                ['title' => 'Dual Telephoto Cameras', 'stat' => '70mm & 166mm', 'desc' => '3x optical telephoto with f/2.8 aperture and 7x optical telephoto for tight framing.'],
                ['title' => 'Max Flight Endurance', 'stat' => '46 Minutes', 'desc' => 'Next-generation aerodynamic airframe combined with 5000 mAh high-capacity cell.'],
                ['title' => 'Omnidirectional Obstacle Sensing', 'stat' => '360° LiDAR', 'desc' => 'Active avoidance with 6 wide-angle visual sensors and APAS 5.0 navigation.'],
                ['title' => 'AeroLink O4 Video Transmission', 'stat' => '20 km HD', 'desc' => '1080p/60fps real-time ultra-responsive live feed with intelligent anti-jamming.'],
                ['title' => 'Nightscape Cinema Mode', 'stat' => '12,800 ISO', 'desc' => 'Advanced AI noise reduction algorithm for pristine low-light twilight captures.'],
            ],
            'specs' => [
                'Flight Time' => '46 minutes (no wind)',
                'Camera Sensor' => '4/3 CMOS Hasselblad + 1/1.3" CMOS 70mm + 1/2" CMOS 166mm',
                'Video Resolution' => '5.1K @ 50fps, 4K @ 120fps D-Log M / HLG',
                'Max Transmission Range' => '20 km (FCC), 12 km (CE)',
                'Max Speed' => '21 m/s (75.6 km/h) in Sport Mode',
                'Takeoff Weight' => '958 g',
                'Obstacle Sensing' => 'Omnidirectional Binocular Vision System + Bottom Infrared LiDAR',
                'Max Wind Resistance' => '12 m/s (Level 6)',
                'Internal Storage' => '64 GB High-Speed eMMC',
                'Operating Temperature' => '-10° to 40° C (14° to 104° F)',
            ],
            'colors' => [
                ['name' => 'Stealth Obsidian', 'hex' => '#181a20', 'label' => 'Standard Carbon Matte'],
                ['name' => 'Arctic Polar White', 'hex' => '#e2e8f0', 'label' => 'Glacier Edition'],
                ['name' => 'Cyber Titanium Grey', 'hex' => '#64748b', 'label' => 'Limited Edition'],
            ],
            'thumbnail_url' => '/images/products/mavic-4-pro.jpg',
            'gallery' => [
                '/images/products/mavic-4-pro.jpg',
                '/images/products/mini-4-pro-angle.jpg',
                '/images/products/mini-4-pro-top.jpg',
            ],
            'model_3d_type' => 'quadcopter_flagship',
            'is_featured' => true,
            'is_hero' => true,
            'order' => 1,
        ]);

        Product::create([
            'category_id' => $catCameraDrones->id,
            'name' => 'AERO Neo 360',
            'slug' => 'aero-neo-360',
            'tagline' => 'Palm Takeoff & AI Tracking',
            'subtitle' => 'Ultra-Lightweight 135g Vlog Drone with 4K Ultra-Stabilized Video',
            'badge' => 'Ultra-Lightweight',
            'price' => 349.00,
            'original_price' => 399.00,
            'description' => "Effortlessly takeoff from the palm of your hand without a remote controller. AERO Neo 360 focuses on keeping you in the spotlight whether you are cycling, hiking, or recording spontaneous family moments.",
            'overview_features' => [
                ['title' => 'Ultra-Light & Portable', 'stat' => '135 g', 'desc' => 'No registration required in most regions. Fits in your jacket pocket.'],
                ['title' => 'Palm Takeoff & Landing', 'stat' => 'One Tap', 'desc' => 'Takeoff directly from your palm and track subjects using advanced computer vision.'],
                ['title' => 'RockSteady EIS', 'stat' => '4K UHD', 'desc' => 'Hardware gimbal paired with electronic image stabilization.'],
                ['title' => 'Full-Coverage Propeller Guards', 'stat' => '360° Safety', 'desc' => 'Safe for indoor and close-proximity cinematic shots.'],
            ],
            'specs' => [
                'Flight Time' => '18 minutes',
                'Weight' => '135 g',
                'Camera Sensor' => '1/2" CMOS 12MP',
                'Video Resolution' => '4K @ 30fps EIS',
                'Transmission' => 'Wi-Fi 6 Direct (up to 50m) / O4 Controller (up to 7km)',
            ],
            'colors' => [
                ['name' => 'Cloud White', 'hex' => '#f8fafc', 'label' => 'Standard'],
                ['name' => 'Midnight Blue', 'hex' => '#1e293b', 'label' => 'Midnight'],
            ],
            'thumbnail_url' => '/images/products/neo-360.jpg',
            'gallery' => [
                '/images/products/neo-360.jpg',
                '/images/products/mini-4-pro-front.jpg',
            ],
            'model_3d_type' => 'compact_drone',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 2,
        ]);

        Product::create([
            'category_id' => $catHandheld->id,
            'name' => 'AERO Osmo Mobile 8',
            'slug' => 'aero-osmo-mobile-8',
            'tagline' => 'In Sync With Every Move',
            'subtitle' => 'Intelligent 3-Axis Smartphone Gimbal with ActiveTrack 6.0 and Magnetic Quick-Release',
            'badge' => 'Flagship Gimbal',
            'price' => 159.00,
            'original_price' => 189.00,
            'description' => "Compact and effortlessly foldable, AERO Osmo Mobile 8 unfolds in a split second and connects magnetically to your phone. With an integrated extension rod and 3-axis brushless stabilization, capture flawless cinematic reels on the go.",
            'overview_features' => [
                ['title' => 'ActiveTrack 6.0', 'stat' => 'Deep Learning', 'desc' => 'Maintains target lock even when subjects turn around or get briefly obscured.'],
                ['title' => 'Built-In Extension Rod', 'stat' => '215 mm', 'desc' => 'Reach higher angles and fit more friends in wide dynamic selfie group shots.'],
                ['title' => 'Magnetic Phone Clamp', 'stat' => 'Quick Snap', 'desc' => 'Mount and detach your smartphone instantly without rebalancing.'],
                ['title' => 'ShotGuides & Templates', 'stat' => '1-Tap Edit', 'desc' => 'Automatically recognizes scenarios and recommends optimal filming sequences.'],
            ],
            'specs' => [
                'Battery Life' => '6.5 hours',
                'Charging Time' => '1.5 hours (Type-C PD)',
                'Gimbal Weight' => '309 g',
                'Payload Capacity' => '170 to 290 g',
                'Dimensions' => 'Unfolded: 276 × 111.5 × 99 mm',
            ],
            'colors' => [
                ['name' => 'Slate Grey', 'hex' => '#334155', 'label' => 'Standard Matte'],
                ['name' => 'Athens Gray', 'hex' => '#e2e8f0', 'label' => 'Platinum'],
            ],
            'thumbnail_url' => '/images/products/osmo-mobile-8.jpg',
            'gallery' => [
                '/images/products/osmo-mobile-8.jpg',
            ],
            'model_3d_type' => 'gimbal_viewer',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 3,
        ]);

        Product::create([
            'category_id' => $catCameraDrones->id,
            'name' => 'AERO Inspire Cinema 3',
            'slug' => 'aero-inspire-cinema-3',
            'tagline' => 'Precision Mastery in Cinema',
            'subtitle' => 'Full-Frame 8K/75fps ProRes RAW Flying Cinema Platform with Centimeter-Level RTK',
            'badge' => 'Cinema 8K Full-Frame',
            'price' => 10999.00,
            'original_price' => 12499.00,
            'description' => "Engineered for high-end film productions, AERO Inspire Cinema 3 combines a full-frame 8K sensor with transformative 360° pan gimbal movement, dual-operator control, and centimeter-accurate RTK trajectory repeatability.",
            'overview_features' => [
                ['title' => 'Full-Frame 8K Sensor', 'stat' => '8K/75fps RAW', 'desc' => 'Supports CinemaDNG and Apple ProRes RAW with 14+ stops dynamic range.'],
                ['title' => 'Centimeter-Level RTK', 'stat' => 'Repeatable Routes', 'desc' => 'Execute complex camera moves with exact spatial repeatability.'],
                ['title' => '360° Pan & Tilt Boost', 'stat' => 'Obstacle-Free', 'desc' => 'Landing gear lifts automatically during takeoff for unobstructed camera panning.'],
                ['title' => 'Dual Control Mode', 'stat' => 'Pilot + DP', 'desc' => 'Independent monitor feeds and controllers for pilot and director of photography.'],
            ],
            'specs' => [
                'Flight Time' => '28 minutes',
                'Max Speed' => '94 km/h',
                'Camera' => 'Zenith X9-8K Air Gimbal Camera',
                'Max Video Bitrate' => '8.1 Gbps ProRes RAW',
                'Weight' => '3,995 g',
            ],
            'colors' => [
                ['name' => 'Carbon Matte', 'hex' => '#111827', 'label' => 'Standard Cinema'],
            ],
            'thumbnail_url' => '/images/products/inspire-cinema-3.png',
            'gallery' => [
                '/images/products/inspire-cinema-3.png',
            ],
            'model_3d_type' => 'quadcopter_flagship',
            'is_featured' => true,
            'is_hero' => true,
            'order' => 4,
        ]);

        Product::create([
            'category_id' => $catCameraDrones->id,
            'name' => 'AERO Air 3S Dual Master',
            'slug' => 'aero-air-3s',
            'tagline' => 'Chase the View in Dual 4K',
            'subtitle' => '1-inch CMOS Primary & 70mm Medium Tele Camera with 14 Stops Dynamic Range',
            'badge' => 'Dual 1-Inch Master',
            'price' => 1099.00,
            'original_price' => 1299.00,
            'description' => "AERO Air 3S redefines dual-camera travel drones: 1-inch primary and 70mm telephoto, both with 14 stops of dynamic range for landscapes and portraits that stand out. Enhanced with all-angle night vision avoidance.",
            'overview_features' => [
                ['title' => 'Dual Camera System', 'stat' => '1" CMOS + 70mm', 'desc' => 'Dual primary cameras with 14 stops dynamic range and Free Panorama mode.'],
                ['title' => 'Nightscape Omnidirectional Sensing', 'stat' => 'Forward LiDAR', 'desc' => 'Safe flight navigation in dim light and nightscapes.'],
                ['title' => 'Flight Endurance', 'stat' => '45 Minutes', 'desc' => 'Ultra-long battery life with power accumulation feature.'],
            ],
            'specs' => [
                'Flight Time' => '45 minutes',
                'Weight' => '724 g',
                'Sensors' => '1-inch 50MP + 1/1.3" 48MP Medium Tele',
                'Max Transmission' => '20 km HD O4',
            ],
            'colors' => [
                ['name' => 'Aerospace Grey', 'hex' => '#475569', 'label' => 'Standard Edition'],
            ],
            'thumbnail_url' => '/images/products/air-3s-unfolded.jpg',
            'gallery' => [
                '/images/products/air-3s-unfolded.jpg',
                '/images/products/air-3s-front.jpg',
                '/images/products/air-3s-full.jpg',
            ],
            'model_3d_type' => 'quadcopter_flagship',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 5,
        ]);

        Product::create([
            'category_id' => $catCameraDrones->id,
            'name' => 'AERO Avata 2 FPV Explorer',
            'slug' => 'aero-avata-2-fpv',
            'tagline' => 'All-Out Immersion',
            'subtitle' => 'Easy ACRO 4K Ultra-Wide FPV Drone with Built-In Propeller Guard',
            'badge' => 'FPV High-Speed',
            'price' => 999.00,
            'original_price' => 1199.00,
            'description' => "Step into immersive flight with AERO Avata 2: Easy ACRO flips, gesture-based motion control, and integrated propeller protection for agile, safe high-speed flights.",
            'overview_features' => [
                ['title' => '1/1.3" CMOS Super-Wide Camera', 'stat' => '4K/60fps HDR', 'desc' => '155° ultra-wide field of view with 10-bit D-Log M color profile.'],
                ['title' => 'Integrated Propeller Guards', 'stat' => 'Turtle Mode', 'desc' => 'Durable unibody frame automatically flips back up if it lands upside down.'],
                ['title' => 'Immersive O4 Video Transmission', 'stat' => '13 km HD', 'desc' => 'Ultra-low 24ms latency live feed straight to smart goggles.'],
            ],
            'specs' => [
                'Flight Time' => '23 minutes',
                'Weight' => '377 g',
                'Camera Sensor' => '1/1.3-inch CMOS 4K/60fps',
                'Internal Storage' => '46 GB High Speed',
            ],
            'colors' => [
                ['name' => 'Stealth Matte Black', 'hex' => '#0f172a', 'label' => 'FPV Racing Edition'],
            ],
            'thumbnail_url' => '/images/products/avata-2-fpv.png',
            'gallery' => [
                '/images/products/avata-2-fpv.png',
            ],
            'model_3d_type' => 'compact_drone',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 6,
        ]);

        Product::create([
            'category_id' => $catAgriculture->id,
            'name' => 'AERO Agras T50 Heavy',
            'slug' => 'aero-agras-t50',
            'tagline' => 'Intelligent Aerial Agriculture',
            'subtitle' => '50kg Spreading & 40kg Spraying Payload with Coaxial Dual-Rotor Power',
            'badge' => 'Heavy Agriculture',
            'price' => 14500.00,
            'original_price' => null,
            'description' => "The AERO Agras T50 inherits a powerful coaxial twin-rotor propulsion system, delivering high spraying flow rates and uniform droplet dispersion for orchards, field crops, and hilly terrain.",
            'overview_features' => [
                ['title' => 'Heavyweight Spraying', 'stat' => '40 kg (50L)', 'desc' => 'Dual atomizing centrifugal nozzles with 24 L/min high-flow pumping.'],
                ['title' => 'Spreading Capacity', 'stat' => '50 kg (75L)', 'desc' => 'Spread fertilizer, seeds, and feed at up to 108 kg/min.'],
                ['title' => 'Active Phased Array Radar', 'stat' => '360° + Top/Bottom', 'desc' => 'Obstacle bypass on slopes up to 50 degrees.'],
            ],
            'specs' => [
                'Spray Payload' => '40 kg (16 ha/hour)',
                'Spread Payload' => '50 kg',
                'Radar System' => 'Active Phased Array 360° Obstacle Bypass',
                'Battery' => '30,000 mAh Fast-Charge Intelligent Battery',
            ],
            'colors' => [
                ['name' => 'Agronomy Green & White', 'hex' => '#15803d', 'label' => 'Standard Agras'],
            ],
            'thumbnail_url' => '/images/products/agras-t50.png',
            'gallery' => [
                '/images/products/agras-t50.png',
            ],
            'model_3d_type' => 'quadcopter_flagship',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 7,
        ]);

        Product::create([
            'category_id' => $catEnterprise->id,
            'name' => 'AERO Matrice 350 RTK',
            'slug' => 'aero-matrice-350-rtk',
            'tagline' => 'Industrial Enterprise Flagship',
            'subtitle' => 'IP55 Weather-Sealed Multi-Payload Heavy Drone with Night Vision & Thermal Inspection',
            'badge' => 'Enterprise Grade',
            'price' => 8990.00,
            'original_price' => 9990.00,
            'description' => "Built to conquer harsh environmental conditions, the Matrice 350 RTK provides multi-sensor gimbal payloads (Thermal, Laser Rangefinder, Zoom, Night Vision FPV) for power line inspections, SAR missions, and firefighting.",
            'overview_features' => [
                ['title' => 'IP55 Weather Resistance', 'stat' => '-20° to 50°C', 'desc' => 'Fly safely in rain, snow, and extreme ambient temperatures.'],
                ['title' => 'Multi-Payload Support', 'stat' => 'Up to 3 Gimbals', 'desc' => 'Mount upward and downward gimbals concurrently.'],
                ['title' => 'Night-Vision FPV', 'stat' => 'Low-Light Star', 'desc' => 'Clear visual navigation during zero-light night operations.'],
            ],
            'specs' => [
                'Flight Time' => '55 minutes',
                'Payload Capacity' => '2.7 kg',
                'Ingress Protection' => 'IP55',
                'Transmission Range' => '20 km O3 Enterprise',
            ],
            'colors' => [
                ['name' => 'Industrial Matte Black', 'hex' => '#0f172a', 'label' => 'Matrice Stealth'],
            ],
            'thumbnail_url' => '/images/products/matrice-350.png',
            'gallery' => [
                '/images/products/matrice-350.png',
            ],
            'model_3d_type' => 'quadcopter_flagship',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 8,
        ]);

        Product::create([
            'category_id' => $catPower->id,
            'name' => 'AERO PowerStation 2000 Pro',
            'slug' => 'aero-powerstation-2000',
            'tagline' => 'Uninterrupted Clean Power',
            'subtitle' => '1024Wh LiFePO4 Ultra-Fast Portable Power Station with 2600W AC Output',
            'badge' => 'Power Solution',
            'price' => 999.00,
            'original_price' => 1199.00,
            'description' => "All-scenario portable power station with 1024Wh capacity and 70-min full recharge. Equipped with dual 140W PD 3.1 USB-C fast charging ports, solar inputs, and 2600W peak surge output.",
            'overview_features' => [
                ['title' => '1024Wh LiFePO4 Cell', 'stat' => '4000+ Cycles', 'desc' => 'Long-lasting battery chemistry lasting over 10 years of daily use.'],
                ['title' => 'Super Fast Recharge', 'stat' => '70 Mins (0-100%)', 'desc' => 'Ultra-quiet 23dB fast charging technology.'],
                ['title' => 'Dual 140W USB-C PD', 'stat' => '2600W Output', 'desc' => 'Powers high-wattage heavy tools, cinema chargers, and drones.'],
            ],
            'specs' => [
                'Capacity' => '1024 Wh (320,000 mAh)',
                'AC Output' => '2600W Max Surge (2200W Constant)',
                'Weight' => '13 kg',
                'Solar Input' => 'Up to 800W Solar Fast Charging',
            ],
            'colors' => [
                ['name' => 'Matte Grey & Silver', 'hex' => '#334155', 'label' => 'Standard Rugged'],
            ],
            'thumbnail_url' => '/images/products/powerstation-2000.png',
            'gallery' => [
                '/images/products/powerstation-2000.png',
            ],
            'model_3d_type' => 'compact_drone',
            'is_featured' => true,
            'is_hero' => false,
            'order' => 9,
        ]);

        // 4. Hero Banners
        Banner::create([
            'badge' => 'TRIPLE-LENS CAMERA DRONE',
            'title' => 'AERO MAVIC 4 PRO',
            'subtitle' => 'Inspiration in Focus — 4K/120fps Hasselblad Cinema System',
            'cta_text' => 'Learn More',
            'cta_link' => '/products/aero-mavic-4-pro',
            'cta_secondary_text' => 'Buy Now',
            'cta_secondary_link' => '/products/aero-mavic-4-pro',
            'image_url' => '/images/hero/hero-mavic-3-pro-4k.jpg',
            'order' => 1,
            'is_active' => true,
        ]);

        Banner::create([
            'badge' => 'CINEMA 8K FULL-FRAME',
            'title' => 'AERO INSPIRE CINEMA 3',
            'subtitle' => 'Unprecedented Precision & Cinematic Fluidity for Feature Films',
            'cta_text' => 'Explore Cinema',
            'cta_link' => '/products/aero-inspire-cinema-3',
            'cta_secondary_text' => 'Order Now',
            'cta_secondary_link' => '/products/aero-inspire-cinema-3',
            'image_url' => '/images/cinematic/shot-on-inspire3-4k.jpg',
            'order' => 2,
            'is_active' => true,
        ]);

        Banner::create([
            'badge' => 'PALM TAKEOFF VLOG DRONE',
            'title' => 'AERO NEO 360',
            'subtitle' => 'Fly Anywhere, Create Everywhere — 135g Ultra-Lightweight AI Follow',
            'cta_text' => 'Discover Neo',
            'cta_link' => '/products/aero-neo-360',
            'cta_secondary_text' => 'Buy Now',
            'cta_secondary_link' => '/products/aero-neo-360',
            'image_url' => '/images/hero/hero-air-3s-4k.jpg',
            'order' => 3,
            'is_active' => true,
        ]);

        Banner::create([
            'badge' => 'FLAGSHIP SMARTPHONE GIMBAL',
            'title' => 'AERO OSMO MOBILE 8',
            'subtitle' => 'In Sync With Every Move — Magnetic Snap-On Stabilization',
            'cta_text' => 'Learn More',
            'cta_link' => '/products/aero-osmo-mobile-8',
            'cta_secondary_text' => 'Order Now',
            'cta_secondary_link' => '/products/aero-osmo-mobile-8',
            'image_url' => '/images/hero/hero-osmo-action-5-4k.jpg',
            'order' => 4,
            'is_active' => true,
        ]);

        // 5. Innovation Editorial Posts
        Post::create([
            'title' => 'AERO Agriculture Annual Report: Empowering Precision Farming Across 50 Million Hectares',
            'slug' => 'aero-agriculture-annual-report',
            'category_tag' => 'Industry Insight Report',
            'subtitle' => 'How autonomous aerial spraying and multispectral field mapping reduce chemical runoff while increasing crop yields.',
            'excerpt' => 'Our 2026 Global Agricultural Outlook details the impact of autonomous drone fleets on food security, water preservation, and sustainable crop protection across 65 countries.',
            'content' => "In 2026, precision agricultural technology reached a critical tipping point. Across the Americas, Europe, and Asia-Pacific, over 200,000 farmers and commercial growers adopted AERO Agras smart drone systems to survey, fertilize, and protect their crops with centimeter precision.\n\nBy leveraging high-resolution multispectral reflectance data and variable-rate spraying nozzles, growers reduced chemical pesticide usage by an average of 34% while increasing net yield by 11.2%.",
            'image_url' => '/images/innovation/innovation-agriculture-4k.jpg',
            'read_time' => '5 min read',
            'is_featured' => true,
            'published_at' => now()->subDays(3),
        ]);

        Post::create([
            'title' => 'AERO Ronin Cinema Gimbal System Honored with 2026 Scientific and Technical Award',
            'slug' => 'aero-ronin-cinema-scientific-award',
            'category_tag' => 'Engineering, Science & Technology',
            'subtitle' => 'Academy of Motion Picture Arts & Sciences recognizes groundbreaking developments in 4-axis camera stabilization.',
            'excerpt' => 'The Scientific and Technical Academy Awards celebrate innovations that have made substantial contributions to the craft of filmmaking.',
            'content' => "The Academy of Motion Picture Arts and Sciences has presented AERO with a Scientific and Technical Achievement Award for the design and engineering of the Ronin 4D 4-axis camera stabilization system.",
            'image_url' => '/images/innovation/innovation-award-4k.jpg',
            'read_time' => '4 min read',
            'is_featured' => true,
            'published_at' => now()->subDays(7),
        ]);

        // 6. Sample Subscriber
        NewsletterSubscriber::create([
            'email' => 'tech.enthusiast@example.com',
            'ip_address' => '127.0.0.1',
            'subscribed_at' => now(),
        ]);
    }
}
