/**
 * Converts RGB values (0-1) to a CSS color string
 */
export const rgbToString = (r: number, g: number, b: number): string => {
  const rInt = Math.floor(r * 255);
  const gInt = Math.floor(g * 255);
  const bInt = Math.floor(b * 255);
  return `rgb(${rInt}, ${gInt}, ${bInt})`;
};

/**
 * Linearly interpolates between two colors
 */
export const lerpColor = (color1: { r: number; g: number; b: number }, 
                         color2: { r: number; g: number; b: number }, 
                         amount: number): { r: number; g: number; b: number } => {
  return {
    r: color1.r + (color2.r - color1.r) * amount,
    g: color1.g + (color2.g - color1.g) * amount,
    b: color1.b + (color2.b - color1.b) * amount
  };
};

/**
 * Creates a color based on position
 */
export const positionToColor = (x: number, y: number): { r: number; g: number; b: number } => {
  // Normalize x and y to 0-1 range
  const normalizedX = (x + 1) / 2;
  const normalizedY = (y + 1) / 2;
  
  // Generate colors using different algorithms for vibrant results
  const r = Math.abs(Math.sin(normalizedX * Math.PI + normalizedY * Math.PI * 0.5));
  const g = Math.abs(Math.cos(normalizedY * Math.PI + normalizedX * Math.PI * 0.7));
  const b = Math.abs(Math.sin((normalizedX + normalizedY) * Math.PI * 0.9));
  
  return { r, g, b };
};