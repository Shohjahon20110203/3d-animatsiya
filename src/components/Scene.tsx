import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useMousePosition } from '../hooks/useMousePosition';
import ParticleField from './ParticleField';
import ColorSphere from './ColorSphere';

const Scene: React.FC = () => {
  const { viewport } = useThree();
  const mousePosition = useMousePosition();
  const [color, setColor] = useState({ r: 1, g: 0.3, b: 0.7 }); // More vibrant initial color
  const groupRef = useRef<THREE.Group>(null);

  const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1;
  const normalizedY = -((mousePosition.y / window.innerHeight) * 2 - 1);
  
  useEffect(() => {
    // Enhanced vibrant color generation
    const r = Math.min(1, Math.abs(Math.sin(normalizedX * 0.8 + 1.2)) * 1.4);
    const g = Math.min(1, Math.abs(Math.sin(normalizedY * 0.8 + 2.4)) * 1.4);
    const b = Math.min(1, Math.abs(Math.cos((normalizedX + normalizedY) * 0.8)) * 1.4);
    
    setColor({ r, g, b });
  }, [normalizedX, normalizedY]);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Enhanced rotation animation
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
      groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.2) * 0.15;
      
      const targetX = normalizedX * viewport.width * 0.3;
      const targetY = normalizedY * viewport.height * 0.3;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.08;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[0, 0, 2]} intensity={1} color={color} />
      
      <color attach="background" args={[0.03, 0.03, 0.08]} />
      
      <group ref={groupRef}>
        <ColorSphere 
          position={[0, 0, 0]} 
          color={color} 
          mousePosition={{ x: normalizedX, y: normalizedY }} 
        />
        <ParticleField 
          count={1500} 
          color={color} 
          mousePosition={{ x: normalizedX, y: normalizedY }} 
        />
      </group>
    </>
  );
};

export default Scene;