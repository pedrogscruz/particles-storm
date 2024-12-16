import { useRef, useState, useEffect } from 'react';
import ParticlesStorm, { ParticlesStormProps } from './particles-storm';
import { isTransparent } from '../utils/colors';

type ParticlesStormBackgroundProps = Omit<ParticlesStormProps, 'width' | 'height'>;

const ParticlesStormBackground = (props: ParticlesStormBackgroundProps) => {
  const particlesStormRef = useRef<HTMLCanvasElement>(null)
  const [stormProps, setStormProps] = useState<{ width: number, height: number, numParticles: number, lineDistance: number, backgroundColor: string }>();

  useEffect(() => {
    if (!particlesStormRef.current) return
    if (!particlesStormRef.current.parentElement) return

    particlesStormRef.current.parentElement.style.position = 'relative'
    particlesStormRef.current.style.position = 'absolute'
    particlesStormRef.current.style.top = '0px'
    particlesStormRef.current.style.left = '0px'
    particlesStormRef.current.style.zIndex = '0'

    const calcProps = () => {
      if (!particlesStormRef.current) return
      if (!particlesStormRef.current.parentElement) return
      const { width, height } = particlesStormRef.current.parentElement.getBoundingClientRect()
      const parentElementArea = width * height
      const numParticles = Math.ceil((parentElementArea + 300000) / 7000)
      const lineDistance = 100
      let { backgroundColor } = window.getComputedStyle(particlesStormRef.current.parentElement)
      backgroundColor = isTransparent(backgroundColor) ? 'white' : backgroundColor
      setStormProps({ width, height, numParticles, lineDistance, backgroundColor })
    }

    calcProps()
    const resizeObserver = new ResizeObserver(() => calcProps())
    resizeObserver.observe(particlesStormRef.current.parentElement)
  }, []);

  return (
    <ParticlesStorm
      ref={particlesStormRef}
      hidden={stormProps === undefined}
      {...stormProps}
      {...props}
    />
  );
};

export default ParticlesStormBackground;
