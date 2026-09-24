import React, { useState, useRef, Suspense, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import DroneModel3D from './DroneModel3D';
import {
    RotateCw,
    Layers,
    Lightbulb,
    Play,
    Pause,
    Compass,
    Sparkles,
    Check,
    RefreshCw,
    Box,
    AlertCircle
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
        console.warn('Three.js / WebGL context notice:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/80 text-gray-300">
                    <Box className="w-16 h-16 text-blue-500 mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold text-white mb-2">Interactive 3D Studio</h3>
                    <p className="text-xs text-gray-400 max-w-sm mb-6">
                        WebGL acceleration fallback active. You can still inspect all aircraft specifications and feature details below.
                    </p>
                    {this.props.thumbnail && (
                        <div className="max-w-md w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img src={this.props.thumbnail} alt="Product Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}

export default function ProductViewer3D({ product }) {
    const [isMounted, setIsMounted] = useState(false);
    const [hasWebGL, setHasWebGL] = useState(true);
    const controlsRef = useRef();
    const cameraRef = useRef();

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

    // Customization finishes (Default: Platinum Silver Metallic)
    const colors = product?.colors || [
        { name: 'Platinum Silver Metallic', hex: '#d4d8df', label: 'Platinum Silver' },
        { name: 'Space Grey Titanium', hex: '#4b5563', label: 'Space Grey' },
        { name: 'Stealth Obsidian', hex: '#181a20', label: 'Carbon Obsidian' },
        { name: 'Arctic Glacier White', hex: '#f8fafc', label: 'Glacier White' },
    ];

    const [selectedColor, setSelectedColor] = useState('#d4d8df');
    const [propellersSpinning, setPropellersSpinning] = useState(true);
    const [lightsOn, setLightsOn] = useState(true);
    const [exploded, setExploded] = useState(0); // 0 (assembled) to 1 (fully exploded)
    const [autoRotate, setAutoRotate] = useState(true);
    const [activeHotspot, setActiveHotspot] = useState(null);

    const hotspots = product?.hotspots || [];

    // Camera preset angles
    const setCameraPreset = (position, target = [0, 0, 0]) => {
        setAutoRotate(false);
        if (controlsRef.current) {
            controlsRef.current.target.set(target[0], target[1], target[2]);
        }
        if (cameraRef.current) {
            cameraRef.current.position.set(position[0], position[1], position[2]);
            cameraRef.current.lookAt(target[0], target[1], target[2]);
        }
    };

    const handleHotspotSelect = (spot) => {
        setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
        if (activeHotspot?.id !== spot.id && spot.position) {
            const [x, y, z] = spot.position;
            setCameraPreset([x * 2.2 + 1, y * 2.2 + 1, z * 2.2 + 2], [x, y, z]);
        }
    };

    const resetView = () => {
        setExploded(0);
        setActiveHotspot(null);
        setAutoRotate(true);
        setCameraPreset([0, 2.2, 5.5], [0, 0, 0]);
    };

    return (
        <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden bg-white border border-gray-200 select-none shadow-sm">
            {/* Three.js Canvas Container with ErrorBoundary and Client Check */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing bg-white">
                {isMounted && hasWebGL ? (
                    <ThreeErrorBoundary thumbnail={product?.thumbnail_url}>
                        <Canvas shadows gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}>
                            {/* Explicit Pure White Background */}
                            <color attach="background" args={['#ffffff']} />

                            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.2, 5.5]} fov={45} />

                            {/* White Studio Lighting Setup */}
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

                                {/* Invisible Ground Plane with Soft Real Dynamic Shadow (Zero Grey Box) */}
                                <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                    <planeGeometry args={[100, 100]} />
                                    <shadowMaterial transparent opacity={0.16} />
                                </mesh>
                            </Suspense>

                            {/* Smooth Orbit Controls */}
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
                ) : isMounted && !hasWebGL ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 text-[#101418]">
                        <Box className="w-16 h-16 text-[#0070d5] mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold text-[#101418] mb-2">{product?.name || 'AERO Aircraft'}</h3>
                        <p className="text-xs text-[#707473] max-w-sm mb-6">
                            Interactive 3D rendering preview mode active.
                        </p>
                        {product?.thumbnail_url && (
                            <div className="max-w-md w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                                <img src={product.thumbnail_url} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white">
                        <div className="text-center space-y-3">
                            <RotateCw className="w-8 h-8 text-[#0070d5] animate-spin mx-auto" />
                            <p className="text-xs text-[#707473] font-mono">Initializing 3D Engine...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Top-Left Finish Colorway Switcher */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-auto p-1.5 sm:p-2.5 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-md shadow-gray-200/40 flex items-center space-x-2">
                <span className="text-[11px] sm:text-xs font-semibold text-[#707473] pl-1 hidden xs:inline">Finish:</span>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                    {colors.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedColor(c.hex)}
                            className={`group relative p-0.5 sm:p-1 rounded-full border transition-all ${
                                selectedColor === c.hex
                                    ? 'border-[#0070d5] ring-2 ring-blue-400/30 scale-105 sm:scale-110 shadow-sm'
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

            {/* Bottom Interactive Controls (Exploded View & Physics Toggles) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 pointer-events-none">
                <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-md shadow-gray-200/40">
                    {/* Exploded View Slider */}
                    <div className="flex items-center space-x-1.5 px-1.5 py-0.5">
                        <Layers className="w-3.5 h-3.5 text-[#0070d5]" />
                        <span className="text-[11px] sm:text-xs font-medium text-[#101418] hidden sm:inline">Exploded:</span>
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

                    {/* Propeller Physics Toggle */}
                    <button
                        onClick={() => setPropellersSpinning(!propellersSpinning)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                            propellersSpinning
                                ? 'bg-blue-50 text-[#0070d5] border border-blue-200 shadow-sm'
                                : 'bg-gray-100 text-[#707473] hover:text-[#101418]'
                        }`}
                    >
                        {propellersSpinning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>Rotor</span>
                    </button>

                    {/* Strobe Navigation Lights Toggle */}
                    <button
                        onClick={() => setLightsOn(!lightsOn)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                            lightsOn
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm'
                                : 'bg-gray-100 text-[#707473] hover:text-[#101418]'
                        }`}
                    >
                        <Lightbulb className="w-3 h-3" />
                        <span>Beacon</span>
                    </button>

                    {/* Auto Rotate Toggle */}
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                            autoRotate
                                ? 'bg-blue-50 text-[#0070d5] border border-blue-200 shadow-sm'
                                : 'bg-gray-100 text-[#707473] hover:text-[#101418]'
                        }`}
                    >
                        <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
                        <span>Orbit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
