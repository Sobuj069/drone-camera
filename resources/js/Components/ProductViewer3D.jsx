import React, { useState, useRef, Suspense, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import DroneModel3D from './DroneModel3D';
import {
    RotateCw,
    Layers,
    Lightbulb,
    Play,
    Pause,
    Sparkles,
    Check,
    Box,
    Image as ImageIcon,
    ZoomIn,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

class ThreeErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Three.js / WebGL fallback triggered:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white text-gray-900">
                    <div className="max-w-md w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white flex items-center justify-center p-4">
                        <img
                            src={this.props.thumbnail || '/images/products/mavic-4-pro.jpg'}
                            alt="Product Preview"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function ProductViewer3D({ product }) {
    const [isMounted, setIsMounted] = useState(false);
    const [hasWebGL, setHasWebGL] = useState(true);
    const [viewMode, setViewMode] = useState('photo'); // Default to HD studio photo for instant, crystal-clean presentation
    const controlsRef = useRef();
    const cameraRef = useRef();

    // Parse safely
    const rawColors = product?.colors;
    const colors = Array.isArray(rawColors)
        ? rawColors
        : typeof rawColors === 'string'
        ? JSON.parse(rawColors || '[]')
        : [
              { name: 'Platinum Silver Metallic', hex: '#d4d8df', label: 'Platinum Silver' },
              { name: 'Space Grey Titanium', hex: '#4b5563', label: 'Space Grey' },
              { name: 'Stealth Obsidian', hex: '#181a20', label: 'Carbon Obsidian' },
              { name: 'Arctic Glacier White', hex: '#f8fafc', label: 'Glacier White' },
          ];

    const rawGallery = product?.gallery;
    const gallery = Array.isArray(rawGallery)
        ? rawGallery
        : typeof rawGallery === 'string'
        ? JSON.parse(rawGallery || '[]')
        : [product?.thumbnail_url || '/images/products/mavic-4-pro.jpg'];

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || '#d4d8df');
    const [propellersSpinning, setPropellersSpinning] = useState(true);
    const [lightsOn, setLightsOn] = useState(true);
    const [exploded, setExploded] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            setHasWebGL(!!gl);
        } catch (e) {
            setHasWebGL(false);
        }
        setIsMounted(true);
    }, []);

    const activeImage = gallery[activeImageIndex] || product?.thumbnail_url || '/images/products/mavic-4-pro.jpg';

    return (
        <div className="relative w-full h-[460px] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden bg-white border border-gray-200/90 select-none shadow-xs">
            {/* View Mode Toggle (HD Studio Photos vs 3D Interactive) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center bg-gray-100/90 backdrop-blur-md p-1 rounded-2xl border border-gray-200 shadow-xs">
                <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'photo'
                            ? 'bg-white text-gray-950 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <ImageIcon className="w-3.5 h-3.5 text-[#0070d5]" />
                    <span>HD Studio Photos</span>
                </button>
                <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        viewMode === '3d'
                            ? 'bg-[#0070d5] text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Interactive</span>
                </button>
            </div>

            {/* Main Stage Content */}
            {viewMode === 'photo' ? (
                /* HD Studio Photo Showcase Mode with Pure White Stage */
                <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-white relative">
                    {/* Active Main High-Resolution Photo */}
                    <div className="flex-1 w-full max-w-2xl flex items-center justify-center p-2 relative group">
                        <img
                            src={activeImage}
                            alt={product?.name || 'Product'}
                            className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105"
                        />

                        {gallery.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                                    className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black transition cursor-pointer"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black transition cursor-pointer"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Gallery Thumbnails Strip */}
                    {gallery.length > 1 && (
                        <div className="flex items-center gap-2 sm:gap-3 mt-2 overflow-x-auto pb-1 max-w-full">
                            {gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-1 bg-white border-2 transition-all overflow-hidden flex items-center justify-center cursor-pointer ${
                                        activeImageIndex === idx
                                            ? 'border-[#0070d5] ring-2 ring-blue-200 shadow-sm'
                                            : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* 3D Interactive WebGL Canvas Studio */
                <div className="w-full h-full cursor-grab active:cursor-grabbing bg-white relative">
                    {isMounted && hasWebGL ? (
                        <ThreeErrorBoundary thumbnail={product?.thumbnail_url}>
                            <Canvas shadows gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}>
                                <color attach="background" args={['#ffffff']} />
                                <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.2, 5.5]} fov={45} />

                                <ambientLight intensity={1.5} />
                                <directionalLight
                                    position={[6, 12, 6]}
                                    intensity={2.8}
                                    castShadow
                                    shadow-mapSize={[2048, 2048]}
                                    shadow-bias={-0.0001}
                                    color="#ffffff"
                                />
                                <directionalLight position={[-6, 8, -4]} intensity={1.4} color="#f0f4f8" />
                                <directionalLight position={[0, 10, -6]} intensity={1.6} color="#ffffff" />
                                <pointLight position={[0, -2, 2]} intensity={0.4} color="#0070d5" />
                                <pointLight position={[0, 4, -3]} intensity={0.5} color="#ffffff" />

                                <Suspense fallback={null}>
                                    <DroneModel3D
                                        color={selectedColor}
                                        accentColor="#0070d5"
                                        propellersSpinning={propellersSpinning}
                                        lightsOn={lightsOn}
                                        exploded={exploded}
                                        activeHotspot={null}
                                        onHotspotClick={() => {}}
                                        hotspots={[]}
                                    />

                                    <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                        <planeGeometry args={[100, 100]} />
                                        <shadowMaterial transparent opacity={0.16} />
                                    </mesh>
                                </Suspense>

                                <OrbitControls
                                    ref={controlsRef}
                                    enableDamping
                                    dampingFactor={0.05}
                                    autoRotate={autoRotate}
                                    autoRotateSpeed={1.0}
                                    minDistance={2.5}
                                    maxDistance={9.0}
                                    maxPolarAngle={Math.PI / 2 + 0.1}
                                    onStart={() => setAutoRotate(false)}
                                />
                            </Canvas>
                        </ThreeErrorBoundary>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white text-[#101418]">
                            <img src={activeImage} alt={product?.name} className="max-w-md w-full h-auto object-contain mb-4" />
                            <p className="text-xs text-gray-500">Studio Photo View</p>
                        </div>
                    )}

                    {/* Top-Left Finish Colorway Switcher (3D Mode) */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-auto p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-sm flex items-center space-x-2">
                        <span className="text-[11px] sm:text-xs font-semibold text-gray-500 pl-1 hidden xs:inline">Finish:</span>
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                            {colors.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedColor(c.hex)}
                                    className={`group relative p-0.5 rounded-full border transition-all cursor-pointer ${
                                        selectedColor === c.hex
                                            ? 'border-[#0070d5] ring-2 ring-blue-400/30 scale-110 shadow-sm'
                                            : 'border-gray-300 hover:border-gray-500'
                                    }`}
                                    title={c.name}
                                >
                                    <div
                                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border border-gray-300/80 flex items-center justify-center"
                                        style={{ backgroundColor: c.hex }}
                                    >
                                        {selectedColor === c.hex && (
                                            <Check className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${c.hex === '#f8fafc' || c.hex === '#d4d8df' ? 'text-[#0070d5]' : 'text-white'}`} />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Interactive Controls (3D Mode) */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 pointer-events-none">
                        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-md">
                            {/* Exploded View Slider */}
                            <div className="flex items-center space-x-1.5 px-1.5 py-0.5">
                                <Layers className="w-3.5 h-3.5 text-[#0070d5]" />
                                <span className="text-[11px] sm:text-xs font-medium text-gray-800 hidden sm:inline">Exploded:</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={exploded}
                                    onChange={(e) => {
                                        setExploded(parseFloat(e.target.value));
                                        setAutoRotate(false);
                                    }}
                                    className="w-14 sm:w-20 accent-[#0070d5] cursor-pointer"
                                />
                            </div>

                            <div className="h-3.5 w-px bg-gray-200" />

                            {/* Propeller Toggle */}
                            <button
                                onClick={() => setPropellersSpinning(!propellersSpinning)}
                                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                                    propellersSpinning
                                        ? 'bg-blue-50 text-[#0070d5] border border-blue-200'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                {propellersSpinning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                <span>Rotor</span>
                            </button>

                            {/* Beacon Toggle */}
                            <button
                                onClick={() => setLightsOn(!lightsOn)}
                                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                                    lightsOn
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                <Lightbulb className="w-3 h-3" />
                                <span>Beacon</span>
                            </button>

                            {/* Orbit Toggle */}
                            <button
                                onClick={() => setAutoRotate(!autoRotate)}
                                className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                                    autoRotate
                                        ? 'bg-blue-50 text-[#0070d5] border border-blue-200'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
                                <span>Orbit</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
