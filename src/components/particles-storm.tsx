import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Particle } from '../types/common';
import { convertToRgba } from '../utils/colors';

export type ParticlesStormProps = {
  width?: number
  height?: number
  numParticles?: number
  lineDistance?: number
  circleColor?: string
  lineColor?: string
  backgroundColor?: string
  speed?: number
  drift?: number
  sizeRange?: [number, number]
  hidden?: boolean
};

const ParticlesStorm = forwardRef<HTMLCanvasElement, ParticlesStormProps>(({
  width = 800,
  height = 600,
  numParticles = 100,
  lineDistance = 15,
  circleColor = '#3498db',
  lineColor = 'rgb(52, 152, 219)',
  backgroundColor = 'white',
  speed = 16,
  drift = 0.35,
  sizeRange = [2, 4],
  hidden
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (hidden) return
    if (!canvasRef.current)  return

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return

    const particles: Particle[] = [];
    const blurLevelMax = sizeRange[1] * 5

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * speed) - (speed / 2),
        vy: (Math.random() * speed) - (speed / 2),
        size,
        blurLevel: size * 4.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (drift !== 0) {
          const movementVariation = {
            x: (Math.random() * speed * drift) - (speed * drift / 2),
            y: (Math.random() * speed * drift) - (speed * drift / 2)
          };
          p.vx += movementVariation.x;
          p.vx = Math.max(speed / -2, Math.min(p.vx, speed / 2))
          p.vy += movementVariation.y;
          p.vy = Math.max(speed / -2, Math.min(p.vy, speed / 2))
        }

        // Bounce off walls
        if (p.x <= 0 || p.x >= width) {
          p.vx *= -1;
          p.x = p.x <= 0 ? 0 : width;
        }
        if (p.y <= 0 || p.y >= height) {
          p.vy *= -1
          p.y = p.y <= 0 ? 0 : height;
        };

        const sizeVariation = (Math.random() * sizeRange[1] * 0.15) - (sizeRange[1] * 0.075);
        p.size += sizeVariation;
        p.size = Math.max(sizeRange[0], Math.min(p.size, sizeRange[1]));
        p.blurLevel = p.size * 4.3;
      })

      particles.sort((a, b) => a.size > b.size ? -1 : b.size > a.size ? 1 : 0)

      particles.forEach((p, i) => {
        // Draw lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dist = Math.sqrt(Math.pow(p.x - other.x, 2) + Math.pow(p.y - other.y, 2));

          if (dist > lineDistance) continue

          const gradient = ctx.createLinearGradient(p.x, p.y, other.x, other.y);
          const blurFactor = Math.max(p.blurLevel, other.blurLevel) / blurLevelMax;

          
          gradient.addColorStop(0, convertToRgba(lineColor, 1 - blurFactor));
          gradient.addColorStop(1, convertToRgba(lineColor, 1 - other.blurLevel / blurLevelMax));

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.shadowBlur = Math.max(p.blurLevel, other.blurLevel);
          ctx.shadowColor = convertToRgba(lineColor, 0.5);
          ctx.stroke();
          ctx.closePath();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = backgroundColor
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const circleBlur = 1 - p.blurLevel / blurLevelMax
        ctx.fillStyle = convertToRgba(circleColor, circleBlur);
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [
    width,
    height,
    numParticles,
    lineDistance,
    circleColor,
    lineColor,
    hidden,
    speed,
    backgroundColor,
    sizeRange,
    drift
  ]);

  // @ts-expect-error prevent unnecessary type error
  useImperativeHandle(ref, () => canvasRef.current);

  return (
    <canvas
      ref={canvasRef}
      style={hidden ? { display: 'none' } : undefined}
      width={width}
      height={height}
    />
  );
});

export default ParticlesStorm;
