import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer } from 'lucide-react';

const Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-full flex items-center text-white">
          <MousePointer className="w-5 h-5 mr-2" />
          <p className="text-sm font-medium">Sichqonchani harakatlantiring</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-8 left-8"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Sherzodov Shohjahon 3D Animatsiya
        </h1>
      </motion.div>
    </div>
  );
};

export default Overlay;