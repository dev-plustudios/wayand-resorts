import React, { useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import Terrain from './Terrain';
import * as THREE from 'three';

// ─── Scroll-driven camera ───────────────────────────────────────────────────
const CameraController = () => {
    useFrame((state) => {
        const scrollY = window.scrollY || 0;
        const scHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const t = Math.min(1, Math.max(0, scrollY / scHeight));

        const targetZ = THREE.MathUtils.lerp(20, 2, t);
        const targetY = THREE.MathUtils.lerp(2, 8, t);
        const targetX = THREE.MathUtils.lerp(0, -8, t);

        state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
        state.camera.position.y += (targetY - state.camera.position.y) * 0.04;

        const pointerX = (state.pointer?.x ?? 0) * 2;
        state.camera.position.x += ((targetX + pointerX) - state.camera.position.x) * 0.04;

        state.camera.lookAt(0, -2, -10);
    });
    return null;
};

// ─── Floating cloud puffs made of plain spheres ─────────────────────────────
const CloudPuff = ({ position, scale, opacity, speed }) => {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) {
            ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
        }
    });
    return (
        <mesh ref={ref} position={position} scale={scale}>
            <sphereGeometry args={[1, 7, 7]} />
            <meshStandardMaterial
                color="#e8f5e9"
                transparent
                opacity={opacity}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
};

const Clouds = () => (
    <group>
        <CloudPuff position={[-8, 8, -22]} scale={[3, 1.5, 2]} opacity={0.25} speed={0.15} />
        <CloudPuff position={[-6, 7, -23]} scale={[2, 1, 1.5]} opacity={0.20} speed={0.12} />
        <CloudPuff position={[10, 9, -28]} scale={[4, 1.8, 2.5]} opacity={0.30} speed={0.18} />
        <CloudPuff position={[13, 8, -27]} scale={[2.5, 1.2, 2]} opacity={0.22} speed={0.14} />
        <CloudPuff position={[0, 6, -18]} scale={[2, 1, 1.5]} opacity={0.18} speed={0.10} />
    </group>
);

// ─── Firefly particles for atmosphere ───────────────────────────────────────
const Fireflies = () => {
    const COUNT = 30;
    const mesh = useRef();
    const positions = useRef(
        Float32Array.from({ length: COUNT * 3 }, (_, i) => {
            const ax = i % 3;
            if (ax === 0) return (Math.random() - 0.5) * 30;
            if (ax === 1) return Math.random() * 8 - 2;
            return (Math.random() - 0.5) * 30 - 10;
        })
    );

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.elapsedTime;
        const pos = mesh.current.geometry.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3 + 1] = positions.current[i * 3 + 1] + Math.sin(t * 0.5 + i * 1.3) * 0.3;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions.current, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#7fffd4"
                size={0.12}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
};

// ─── Error boundary to prevent silent Canvas crash ──────────────────────────
class SceneErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-forest-green">
                    <p className="text-emerald-light text-sm opacity-50">3D experience not available</p>
                </div>
            );
        }
        return this.props.children;
    }
}

// ─── Main Scene ─────────────────────────────────────────────────────────────
export default function Scene() {
    return (
        <SceneErrorBoundary>
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: false, powerPreference: 'default' }}
                camera={{ position: [0, 2, 20], fov: 50 }}
                style={{ width: '100%', height: '100%' }}
            >
                <color attach="background" args={['#0B3D2E']} />
                <fog attach="fog" args={['#0B3D2E', 12, 45]} />

                <CameraController />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    position={[15, 20, 5]}
                    intensity={2.5}
                    color="#FF7A00"
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-10, 10, -10]} intensity={1.2} color="#2EC4B6" />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#3FA34D" />

                {/* Terrain */}
                <Terrain />

                {/* Atmosphere */}
                <Clouds />
                <Fireflies />

                {/* Sky */}
                <Sky
                    distance={450000}
                    sunPosition={[15, 2, 5]}
                    inclination={0.49}
                    azimuth={0.25}
                    turbidity={8}
                    rayleigh={1}
                />
            </Canvas>
        </SceneErrorBoundary>
    );
}
