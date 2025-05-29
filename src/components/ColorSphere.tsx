import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ColorSphereProps {
  position: [number, number, number];
  color: { r: number; g: number; b: number };
  mousePosition: { x: number; y: number };
}

const ColorSphere: React.FC<ColorSphereProps> = ({ position, color, mousePosition }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Create LED-like pulsating effect
      const pulseSpeed = 2;
      const pulseIntensity = 0.15;
      const scale = 1 + Math.sin(clock.getElapsedTime() * pulseSpeed) * pulseIntensity;
      meshRef.current.scale.set(scale, scale, scale);
      
      if (materialRef.current) {
        // Enhanced glow effect for LED appearance
        const glowIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
        materialRef.current.emissiveIntensity = glowIntensity;
        
        // Smooth color transitions
        materialRef.current.color.r += (color.r - materialRef.current.color.r) * 0.05;
        materialRef.current.color.g += (color.g - materialRef.current.color.g) * 0.05;
        materialRef.current.color.b += (color.b - materialRef.current.color.b) * 0.05;
        
        // Update emissive color for enhanced LED effect
        materialRef.current.emissive.setRGB(
          color.r * glowIntensity,
          color.g * glowIntensity,
          color.b * glowIntensity
        );
      }
    }
  });

  // Create pentagon geometry
  const pentagonGeometry = new THREE.CircleGeometry(1, 5);

  return (
    <mesh 
      geometry={pentagonGeometry}
      position={position} 
      ref={meshRef}
      rotation={[0, 0, Math.PI / 2]} // Rotate to align pentagon properly
    >
      <meshStandardMaterial
        ref={materialRef}
        color={new THREE.Color(color.r, color.g, color.b)}
        emissive={new THREE.Color(color.r * 0.5, color.g * 0.5, color.b * 0.5)}
        metalness={0.2}
        roughness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export default ColorSphere;