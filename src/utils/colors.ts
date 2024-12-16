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

export function isTransparent(color: string) {
  try {
    const rgb = chroma(color).rgba();
    return rgb[3] === 0;
  } catch (error) {
    console.error('Invalid color input:', error);
    return false;
  }
}
