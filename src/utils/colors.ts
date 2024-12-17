import chroma from 'chroma-js';

export function convertToRgba(color: string, opacity: number) {
  try {
    const parsedColor = chroma(color);
    const [r, g, b] = parsedColor.rgb();
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } catch (error) {
    console.error('Invalid color input:', error);
    return `rgba(52, 152, 219, ${opacity})`;
  }
}
