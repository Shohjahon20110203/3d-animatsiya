import React from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Canvas
        className="absolute inset-0 z-10"
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Scene />
      </Canvas>
      <AnimatePresence>
        <Overlay />
      </AnimatePresence>
    </div>
  );
}

export default App;