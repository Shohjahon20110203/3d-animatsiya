import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count: number;
  color: { r: number; g: number; b: number };
  mousePosition: { x: number; y: number };
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count, color, mousePosition }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position particles in a pentagon pattern
      const angle = (2 * Math.PI * (i % 5)) / 5;
      const radius = 3 + Math.random() * 3;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      colors[i3] = 0.8 + Math.random() * 0.2;
      colors[i3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return { positions, velocities, colors };
  }, [count]);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3));
    return geo;
  }, [particles]);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const dist = Math.sqrt(x * x + y * y + z * z);
        
        // Enhanced LED particle effect
        const pulseIntensity = 0.08;
        const attraction = 0.05;
        positions[i3] += (mousePosition.x * 2 - x / dist) * attraction;
        positions[i3 + 1] += (mousePosition.y * 2 - y / dist) * attraction;
        
        // Add pulsating movement
        const pulse = Math.sin(clock.getElapsedTime() * 2 + dist) * pulseIntensity;
        positions[i3] += x * pulse;
        positions[i3 + 1] += y * pulse;
        
        // LED-like color pulsing
        const colorPulse = 0.7 + Math.sin(clock.getElapsedTime() * 3 + dist) * 0.3;
        colors[i3] = color.r * colorPulse;
        colors[i3 + 1] = color.g * colorPulse;
        colors[i3 + 2] = color.b * colorPulse;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
      
      if (particleMaterialRef.current) {
        // Pulsating particle size for LED effect
        particleMaterialRef.current.size = 0.08 + Math.sin(clock.getElapsedTime() * 2) * 0.03;
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry {...geometry} />
      <pointsMaterial
        ref={particleMaterialRef}
        size={0.08}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;