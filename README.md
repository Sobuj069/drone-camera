# AERO — DJI-Style 3D Product Showcase Platform

A next-generation drone and imaging showcase website built inside a **single Laravel 11 repository** powered by **Inertia.js + React 18 + Vite + Tailwind CSS**. Features high-end cinematic visuals, GSAP ScrollTrigger parallax, Framer Motion page transitions, an interactive Three.js (React Three Fiber) 3D quadcopter drone studio with real-time hotspots, and a comprehensive Filament v3 Admin Panel.

---

## 🚀 Key Features

1. **Single Repository Architecture**: Unified Laravel 11 backend and React 18 Inertia frontend — no separate Next.js repo or Node server needed.
2. **Interactive 3D Product Studio (Three.js / React Three Fiber)**:
   - 360° orbital rotation, smooth inertia damping, scroll zoom.
   - Interactive pulsing 3D Hotspots on key drone components (Triple-lens Hasselblad camera, Omnidirectional LiDAR, Brushless propulsion, Intelligent 4S battery, AeroLink O4 antenna).
   - Camera angle presets (Front, Camera close-up, Top down, Hero angle).
   - Real-time colorway customizer (Stealth Obsidian, Arctic Polar White, Cyber Titanium Grey).
   - Exploded view slider to inspect internal modular architecture.
   - Propeller spin physics toggle & LED navigation strobe beacon lights.
3. **Cinematic Hero Banner (Framer Motion)**:
   - Full-bleed multi-slide slider with auto-rotation, animated typography, and dual pill action buttons.
4. **2x2 Product Showcase Grid**:
   - Clean, high-contrast cards with zoom-on-hover imagery, category tags, and direct detail links.
5. **"Shot on AERO" Parallax (GSAP ScrollTrigger)**:
   - Pinned depth parallax showcasing 4K/8K action footage and stills.
6. **"Standing at the Forefront of Innovation"**:
   - Editorial 2-column cards showcasing enterprise breakthroughs and scientific awards.
7. **"Explore Products in Different Fields"**:
   - 3-column interactive solution cards (Video Production, Enterprise Inspection, Precision Agriculture).
8. **Product Comparison Matrix (`/compare`)**:
   - Interactive side-by-side comparison of flight time, camera sensors, transmission range, speed, and weight.
9. **Full-Featured Filament v3 Admin Panel (`/admin`)**:
   - Manage Products, Categories, Hero Banners, Innovation Articles, Customer Inquiries, and Newsletter Subscribers.
10. **Inertia `useForm` Lead Capture & Newsletter**:
    - Real-time validation and animated flash toast feedback.

---

## 🛠 Tech Stack

- **Backend**: Laravel 11, PHP 8.3+, SQLite / MySQL, Eloquent ORM
- **Admin Panel**: Filament v3 (`/admin`)
- **Frontend Bridge**: Inertia.js (React Adapter)
- **UI Library**: React 18
- **Styling**: Tailwind CSS, Glassmorphism, Dark/Light theme tokens
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: GSAP 3 + ScrollTrigger, Framer Motion
- **Icons**: Lucide React

---

## 📦 Getting Started

### 1. Prerequisites
- PHP 8.2 or 8.3+
- Composer
- Node.js 18+ and npm

### 2. Installation

Clone the repository and install backend and frontend dependencies:

```bash
# 1. Install PHP dependencies
composer install

# 2. Install NPM dependencies
npm install --legacy-peer-deps

# 3. Environment configuration
cp .env.example .env
php artisan key:generate

# 4. Run database migrations and seed realistic DJI-grade catalog data
php artisan migrate:fresh --seed
```

### 3. Development Server

Start both the Vite asset compiler and the Laravel development server:

```bash
# Terminal 1: Run Vite in development mode
npm run dev

# Terminal 2: Run Laravel backend server
php artisan serve
```

Alternatively, to create a production bundle:

```bash
npm run build
php artisan serve
```

---

## 🔐 Admin Panel Credentials

Access the Filament admin panel at `http://localhost:8000/admin`:

- **URL**: `http://localhost:8000/admin`
- **Email**: `admin@drone.test`
- **Password**: `password`

From the admin panel, you can:
- Create, edit, and delete products, specifications, and 3D hotspot annotations.
- Manage homepage hero carousel banners and ordering.
- Publish innovation stories and news articles.
- Review and update customer contact inquiries.
- View and export newsletter subscribers.

---

## 🧪 Automated Testing

Run the PHPUnit feature test suite:

```bash
php artisan test
```

---

## 📁 Repository Structure

```
├── app/
│   ├── Filament/Resources/   # Filament v3 Admin Resources (Product, Category, Banner, Post, Inquiry, Subscriber)
│   ├── Http/Controllers/    # Inertia Controllers (HomeController, ProductController, CompareController, etc.)
│   ├── Models/               # Eloquent Models (Product, Category, Banner, Post, Inquiry, NewsletterSubscriber)
│   └── Providers/Filament/   # Admin Panel Provider
├── database/
│   ├── migrations/           # Database Schema Migrations
│   └── seeders/              # Comprehensive DJI-style Seeder Data
├── resources/
│   ├── css/app.css           # Tailwind styling & Glassmorphism classes
│   ├── js/
│   │   ├── Components/       # Navbar, Footer, HeroBanner, ProductViewer3D, DroneModel3D, Parallax, etc.
│   │   ├── Layouts/          # MainLayout.jsx (Navbar, FlashToast, CookieConsent, Footer)
│   │   ├── Pages/            # Inertia React Pages (Home, Products/Index, Products/Show, Compare, News, Support, About, Contact)
│   │   └── app.jsx           # Inertia application entry point
│   └── views/app.blade.php   # Root Blade template
└── routes/
    └── web.php               # Public application routes
```

---

## 📄 License
Open-source software licensed under the MIT License.
