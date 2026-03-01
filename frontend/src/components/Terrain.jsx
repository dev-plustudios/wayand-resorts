import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function Terrain() {
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(80, 80, 128, 128);
        geo.rotateX(-Math.PI / 2);

        const pos = geo.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vz = pos.getZ(i);

            const distance = Math.sqrt(vx * vx + vz * vz);

            // Create rolling hills combining sine waves
            let y = 0;
            y += Math.sin(vx * 0.1) * Math.cos(vz * 0.1) * 2;
            y += Math.sin(vx * 0.03 + 2) * Math.sin(vz * 0.04) * 6;

            // Flatten the center slightly for the camera area
            const flattenFactor = Math.min(1, distance / 10);
            y *= flattenFactor;

            pos.setY(i, y);
        }

        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <mesh geometry={geometry} receiveShadow castShadow position={[0, -5, -10]}>
            <meshStandardMaterial
                color="#1F6F50"
                roughness={0.9}
                metalness={0.1}
                flatShading={true} // gives a low-poly stylized look which works well for futuristic eco-luxury
            />
        </mesh>
    );
}
