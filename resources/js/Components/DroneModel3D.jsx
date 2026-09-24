import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function DroneModel3D({
    color = '#d4d8df',
    accentColor = '#0070d5',
    propellersSpinning = true,
    lightsOn = true,
    exploded = 0, // 0 to 1
    activeHotspot = null,
    onHotspotClick = () => {},
    hotspots = []
}) {
    const groupRef = useRef();
    const prop1Ref = useRef();
    const prop2Ref = useRef();
    const prop3Ref = useRef();
    const prop4Ref = useRef();
    const gimbalRef = useRef();
    const beaconLightRef = useRef();

    // High-End Aerospace Materials
    const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.2,
        metalness: 0.92,
        envMapIntensity: 2.0,
    }), [color]);

    const silverArmMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.22,
        metalness: 0.9,
    }), [color]);

    const darkCarbonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1e232a'),
        roughness: 0.45,
        metalness: 0.7,
    }), []);

    const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f1f5f9'),
        roughness: 0.08,
        metalness: 0.98,
        envMapIntensity: 2.5,
    }), []);

    const goldAccentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color('#eab308'),
        roughness: 0.25,
        metalness: 0.9,
    }), []);

    const cameraLensMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0a0f1d'),
        roughness: 0.03,
        metalness: 0.2,
        transmission: 0.85,
        transparent: true,
        opacity: 0.95,
        reflectivity: 0.95,
    }), []);

    const ledGreenMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color(lightsOn ? '#10b981' : '#047857'),
    }), [lightsOn]);

    const ledRedMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color(lightsOn ? '#ef4444' : '#b91c1c'),
    }), [lightsOn]);

    const ledCyanMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color(lightsOn ? '#00e5ff' : '#0284c7'),
    }), [lightsOn]);

    // Propeller spinning & subtle idle hover animation
    useFrame((state, delta) => {
        if (propellersSpinning) {
            const speed = delta * 35;
            if (prop1Ref.current) prop1Ref.current.rotation.y += speed;
            if (prop2Ref.current) prop2Ref.current.rotation.y -= speed;
            if (prop3Ref.current) prop3Ref.current.rotation.y -= speed;
            if (prop4Ref.current) prop4Ref.current.rotation.y += speed;
        }

        // Subtle floating pitch & roll
        if (groupRef.current && !exploded) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.015;
        }

        // Gimbal slight compensation
        if (gimbalRef.current) {
            gimbalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    const armOffset = exploded * 0.8;
    const batteryOffset = exploded * 0.9;
    const cameraOffset = exploded * 0.7;

    return (
        <group ref={groupRef} dispose={null}>
            {/* 1. Main Fuselage (Central Body) */}
            <group position={[0, 0, 0]}>
                {/* Upper aerodynamic shell */}
                <mesh position={[0, 0.2, 0]} material={bodyMaterial} castShadow receiveShadow>
                    <boxGeometry args={[1.1, 0.42, 2.2]} />
                </mesh>
                
                {/* Nose curvature */}
                <mesh position={[0, 0.12, 1.15]} material={bodyMaterial} castShadow>
                    <cylinderGeometry args={[0.55, 0.45, 0.35, 16]} />
                </mesh>

                {/* Top Center Intake / Status Display */}
                <mesh position={[0, 0.42, 0.1]} material={darkCarbonMaterial}>
                    <boxGeometry args={[0.6, 0.05, 1.0]} />
                </mesh>
                {/* Accent line on top */}
                <mesh position={[0, 0.45, 0.1]}>
                    <boxGeometry args={[0.08, 0.02, 0.8]} />
                    <meshBasicMaterial color={accentColor} />
                </mesh>

                {/* Top LiDAR Dome & GPS Module */}
                <mesh position={[0, 0.48, -0.3]} material={darkCarbonMaterial}>
                    <cylinderGeometry args={[0.22, 0.25, 0.12, 16]} />
                </mesh>
                {lightsOn && (
                    <pointLight position={[0, 0.6, -0.3]} color="#00f0ff" intensity={0.8} distance={2} />
                )}
                <mesh position={[0, 0.55, -0.3]} material={ledCyanMaterial}>
                    <sphereGeometry args={[0.06, 12, 12]} />
                </mesh>

                {/* Forward Obstacle Sensing Binocular Stereo Cameras */}
                <mesh position={[-0.32, 0.25, 1.28]} material={cameraLensMaterial}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                </mesh>
                <mesh position={[0.32, 0.25, 1.28]} material={cameraLensMaterial}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                </mesh>
                {/* Rear obstacle vision sensors */}
                <mesh position={[-0.35, 0.2, -1.1]} material={cameraLensMaterial}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                </mesh>
                <mesh position={[0.35, 0.2, -1.1]} material={cameraLensMaterial}>
                    <sphereGeometry args={[0.07, 12, 12]} />
                </mesh>
            </group>

            {/* 2. Intelligent Battery Module (Rear) */}
            <group position={[0, 0.18, -1.0 - batteryOffset]}>
                <mesh material={darkCarbonMaterial} castShadow>
                    <boxGeometry args={[0.85, 0.35, 0.6]} />
                </mesh>
                {/* Battery 4-LED status indicator */}
                {[-0.18, -0.06, 0.06, 0.18].map((xPos, idx) => (
                    <mesh key={idx} position={[xPos, 0.2, -0.28]} material={ledGreenMaterial}>
                        <boxGeometry args={[0.06, 0.02, 0.04]} />
                    </mesh>
                ))}
            </group>

            {/* 3. 3-Axis Gimbal & Triple-Lens Camera (Front Bottom) */}
            <group ref={gimbalRef} position={[0, -0.28, 1.0 + cameraOffset]}>
                {/* Gimbal base connector */}
                <mesh material={darkCarbonMaterial}>
                    <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
                </mesh>

                {/* Gimbal U-bracket */}
                <mesh position={[0, -0.15, 0]} material={chromeMaterial}>
                    <boxGeometry args={[0.7, 0.1, 0.4]} />
                </mesh>

                {/* Main Camera Body (Hasselblad) */}
                <mesh position={[0, -0.32, 0.1]} material={darkCarbonMaterial} castShadow>
                    <boxGeometry args={[0.65, 0.45, 0.55]} />
                </mesh>

                {/* Gold Hasselblad Accent Ring */}
                <mesh position={[0, -0.32, 0.4]} material={goldAccentMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.22, 0.025, 12, 24]} />
                </mesh>

                {/* Main 4/3 Large Lens Barrel */}
                <mesh position={[0, -0.32, 0.42]} material={chromeMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.15, 24]} />
                </mesh>
                <mesh position={[0, -0.32, 0.5]} material={cameraLensMaterial}>
                    <circleGeometry args={[0.18, 24]} />
                </mesh>

                {/* Dual Telephoto Secondary Lenses */}
                <mesh position={[-0.18, -0.2, 0.38]} material={chromeMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
                </mesh>
                <mesh position={[-0.18, -0.2, 0.44]} material={cameraLensMaterial}>
                    <circleGeometry args={[0.08, 16]} />
                </mesh>

                <mesh position={[0.18, -0.2, 0.38]} material={chromeMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.09, 0.09, 0.1, 16]} />
                </mesh>
                <mesh position={[0.18, -0.2, 0.44]} material={cameraLensMaterial}>
                    <circleGeometry args={[0.08, 16]} />
                </mesh>
            </group>

            {/* 4. Front-Right Arm & Motor (Arm 1) */}
            <group position={[0.5 + armOffset, 0.1, 0.6 + armOffset]}>
                {/* Silver aerodynamic arm bar */}
                <mesh position={[0.8, 0, 0.5]} rotation={[0, -0.6, 0]} material={silverArmMaterial} castShadow>
                    <boxGeometry args={[1.6, 0.15, 0.2]} />
                </mesh>
                {/* Carbon underside spine */}
                <mesh position={[0.8, -0.05, 0.5]} rotation={[0, -0.6, 0]} material={darkCarbonMaterial}>
                    <boxGeometry args={[1.5, 0.05, 0.16]} />
                </mesh>
                {/* Motor housing */}
                <mesh position={[1.4, 0.15, 0.9]} material={chromeMaterial} castShadow>
                    <cylinderGeometry args={[0.24, 0.24, 0.25, 20]} />
                </mesh>
                {/* Nav Light (Green) */}
                <mesh position={[1.4, 0, 0.9]} material={ledGreenMaterial}>
                    <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
                </mesh>
                {lightsOn && (
                    <pointLight position={[1.4, -0.1, 0.9]} color="#10b981" intensity={0.9} distance={1.8} />
                )}
                {/* Propeller */}
                <group ref={prop1Ref} position={[1.4, 0.3, 0.9]}>
                    <mesh material={darkCarbonMaterial} castShadow>
                        <boxGeometry args={[2.4, 0.02, 0.16]} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} material={goldAccentMaterial}>
                        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
                    </mesh>
                </group>
            </group>

            {/* 5. Front-Left Arm & Motor (Arm 2) */}
            <group position={[-0.5 - armOffset, 0.1, 0.6 + armOffset]}>
                <mesh position={[-0.8, 0, 0.5]} rotation={[0, 0.6, 0]} material={silverArmMaterial} castShadow>
                    <boxGeometry args={[1.6, 0.15, 0.2]} />
                </mesh>
                <mesh position={[-0.8, -0.05, 0.5]} rotation={[0, 0.6, 0]} material={darkCarbonMaterial}>
                    <boxGeometry args={[1.5, 0.05, 0.16]} />
                </mesh>
                <mesh position={[-1.4, 0.15, 0.9]} material={chromeMaterial} castShadow>
                    <cylinderGeometry args={[0.24, 0.24, 0.25, 20]} />
                </mesh>
                <mesh position={[-1.4, 0, 0.9]} material={ledGreenMaterial}>
                    <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
                </mesh>
                {lightsOn && (
                    <pointLight position={[-1.4, -0.1, 0.9]} color="#10b981" intensity={0.9} distance={1.8} />
                )}
                <group ref={prop2Ref} position={[-1.4, 0.3, 0.9]}>
                    <mesh material={darkCarbonMaterial} castShadow>
                        <boxGeometry args={[2.4, 0.02, 0.16]} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} material={goldAccentMaterial}>
                        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
                    </mesh>
                </group>
            </group>

            {/* 6. Rear-Right Arm & Motor (Arm 3) */}
            <group position={[0.5 + armOffset, 0.1, -0.6 - armOffset]}>
                <mesh position={[0.8, 0, -0.5]} rotation={[0, 0.6, 0]} material={silverArmMaterial} castShadow>
                    <boxGeometry args={[1.6, 0.15, 0.2]} />
                </mesh>
                <mesh position={[0.8, -0.05, -0.5]} rotation={[0, 0.6, 0]} material={darkCarbonMaterial}>
                    <boxGeometry args={[1.5, 0.05, 0.16]} />
                </mesh>
                <mesh position={[1.4, 0.15, -0.9]} material={chromeMaterial} castShadow>
                    <cylinderGeometry args={[0.24, 0.24, 0.25, 20]} />
                </mesh>
                <mesh position={[1.4, 0, -0.9]} material={ledRedMaterial}>
                    <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
                </mesh>
                {lightsOn && (
                    <pointLight position={[1.4, -0.1, -0.9]} color="#ef4444" intensity={0.9} distance={1.8} />
                )}
                <group ref={prop3Ref} position={[1.4, 0.3, -0.9]}>
                    <mesh material={darkCarbonMaterial} castShadow>
                        <boxGeometry args={[2.4, 0.02, 0.16]} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} material={goldAccentMaterial}>
                        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
                    </mesh>
                </group>
            </group>

            {/* 7. Rear-Left Arm & Motor (Arm 4) */}
            <group position={[-0.5 - armOffset, 0.1, -0.6 - armOffset]}>
                <mesh position={[-0.8, 0, -0.5]} rotation={[0, -0.6, 0]} material={silverArmMaterial} castShadow>
                    <boxGeometry args={[1.6, 0.15, 0.2]} />
                </mesh>
                <mesh position={[-0.8, -0.05, -0.5]} rotation={[0, -0.6, 0]} material={darkCarbonMaterial}>
                    <boxGeometry args={[1.5, 0.05, 0.16]} />
                </mesh>
                <mesh position={[-1.4, 0.15, -0.9]} material={chromeMaterial} castShadow>
                    <cylinderGeometry args={[0.24, 0.24, 0.25, 20]} />
                </mesh>
                <mesh position={[-1.4, 0, -0.9]} material={ledRedMaterial}>
                    <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
                </mesh>
                {lightsOn && (
                    <pointLight position={[-1.4, -0.1, -0.9]} color="#ef4444" intensity={0.9} distance={1.8} />
                )}
                <group ref={prop4Ref} position={[-1.4, 0.3, -0.9]}>
                    <mesh material={darkCarbonMaterial} castShadow>
                        <boxGeometry args={[2.4, 0.02, 0.16]} />
                    </mesh>
                    <mesh position={[0, 0.03, 0]} material={goldAccentMaterial}>
                        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
                    </mesh>
                </group>
            </group>

            {/* 8. Bottom Landing Legs / Foot Pads */}
            <mesh position={[-0.45, -0.3, 0.5]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.35, 0.12]} />
            </mesh>
            <mesh position={[0.45, -0.3, 0.5]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.35, 0.12]} />
            </mesh>
            <mesh position={[-0.45, -0.3, -0.6]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.35, 0.12]} />
            </mesh>
            <mesh position={[0.45, -0.3, -0.6]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.35, 0.12]} />
            </mesh>

            {/* 9. Interactive 3D Hotspot HTML Markers */}
            {hotspots && hotspots.map((spot) => {
                const isActive = activeHotspot?.id === spot.id;
                return (
                    <group key={spot.id} position={spot.position}>
                        <Html center distanceFactor={10} zIndexRange={[100, 0]}>
                            <div className="relative group cursor-pointer" onClick={() => onHotspotClick(spot)}>
                                {/* Pulsing Outer Ring */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                    isActive ? 'scale-125' : 'hover:scale-115'
                                }`}>
                                    <div className="absolute inset-0 rounded-full bg-blue-500/40 hotspot-pulse" />
                                    <div className="w-5 h-5 rounded-full bg-blue-600/90 border-2 border-white shadow-lg shadow-blue-500/50 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    </div>
                                </div>

                                {/* Tooltip label when active or on desktop hover */}
                                {isActive && (
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-3.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-blue-500/30 shadow-2xl text-left pointer-events-auto">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded-full">
                                                {spot.badge || 'Feature'}
                                            </span>
                                            {spot.spec_highlight && (
                                                <span className="text-[10px] text-gray-400 font-mono">
                                                    {spot.spec_highlight}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-xs font-bold text-white mb-1">
                                            {spot.title}
                                        </h4>
                                        <p className="text-[11px] text-gray-300 leading-snug">
                                            {spot.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}
