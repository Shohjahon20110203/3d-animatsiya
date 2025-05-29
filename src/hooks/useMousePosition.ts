import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setMousePosition({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return mousePosition;
};