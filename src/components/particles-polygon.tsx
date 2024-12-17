import { useEffect, useRef, useState, SVGProps, useCallback, Fragment } from "react";
import type { Vertex, Vertices } from "../types/common";


type ParticlesPolygonProps<T = number | (Vertex[])> = {
  vertices?: T
  size?: number
  rotationSpeed?: number
  movementAmplitude?: number
  circleColor?: string
  lineColor?: string
  onClickCircle?: (circleKey: T extends Vertex[] ? string : number) => unknown
  svgProps?: SVGProps<SVGSVGElement>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const ParticlesPolygon = ({
  vertices: verticesProp = 5,
  size = 100,
  rotationSpeed: rotationSpeedProp = 6,
  movementAmplitude: movementAmplitudeProp = 0.6,
  circleColor = '#3498db',
  lineColor = 'rgba(52, 152, 219, 0.4)',
  onClickCircle,
  style,
  svgProps,
  ...props
}: ParticlesPolygonProps) => {
  const [vertices, setVertices] = useState<Vertices[]>([]);
  const requestRef = useRef(0);
  const rotationAngle = useRef(0);
  const rotationSpeed = rotationSpeedProp / 100
  const movementAmplitude = size * movementAmplitudeProp
  const numVertices = Array.isArray(verticesProp) ? verticesProp.length : verticesProp

  const updateVertices = useCallback(() => {
    rotationAngle.current += rotationSpeed;

    setVertices((prevVertices) => {
      return prevVertices.map((vertex) => {
        vertex.v += Math.random() * movementAmplitude / 200 - movementAmplitude / 400
        vertex.v = Math.max(
          -movementAmplitude / 50,
          Math.min(movementAmplitude / 50, vertex.v)
        );
        // Update the random offset with a slight oscillation effect
        const newRandomOffset = vertex.randomOffset + vertex.v;
        const boundedOffset = Math.max(
          -movementAmplitude / 2,
          Math.min(movementAmplitude / 2, newRandomOffset)
        );

        return {
          ...vertex,
          randomOffset: boundedOffset,
        };
      });
    });
    requestRef.current = requestAnimationFrame(updateVertices);
  }, [movementAmplitude, rotationSpeed]);

  const onMouseEnterCircle = useCallback(() => {
    cancelAnimationFrame(requestRef.current);
  }, [])

  const onMouseLeaveCircle = useCallback(() => {
    updateVertices();
  }, [updateVertices])

  // Initialize the vertices in an equilateral configuration
  useEffect(() => {
    const angleIncrement = (2 * Math.PI) / numVertices;
    const initialVertices = [];

    for (let i = 0; i < numVertices; i++) {
      const angle = i * angleIncrement;
      initialVertices.push({
        angle,
        radius: size,
        randomOffset: 0, // Initial random offset
        v: Math.random() * movementAmplitude / 100 - movementAmplitude / 200,
        vertex: Array.isArray(verticesProp) ? verticesProp[i] : i
      });
    }

    setVertices(initialVertices);
  }, [numVertices, size, movementAmplitude, verticesProp]);

  // Update the rotation and random movement of vertices
  useEffect(() => {
    updateVertices();
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateVertices]);

  const center = size + movementAmplitude
  const elementSize = 2 * center

  // Calculate the points and draw connecting lines
  const points = vertices.map((vertex, _index) => {
    const adjustedRadius = vertex.radius + vertex.randomOffset;
    const angle = vertex.angle + rotationAngle.current;

    const x = center + adjustedRadius * Math.cos(angle);
    const y = center + adjustedRadius * Math.sin(angle);

    return { x, y, vertexItem: vertex };
  });

  return (
    <div style={{ ...style, ...Array.isArray(verticesProp) && { position: 'relative' } }} {...props}>
      <svg
        width={elementSize}
        height={elementSize}
        {...svgProps}
      >
        {points.map((point, index) => {
          const nextPoint = points[(index + 1) % points.length];
          return (
            <line
              key={index}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke={lineColor}
              strokeWidth="2"
            />
          );
        })}
        {points.map((point, index) => (
          <Fragment key={`point-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={4}
              fill={circleColor}
              {...onClickCircle !== undefined && {
                style: { cursor: 'pointer' },
                onMouseEnter: () => onMouseEnterCircle(),
                onMouseLeave: () => onMouseLeaveCircle(),
                onClick: () => onClickCircle(typeof point.vertexItem.vertex === 'number' ? point.vertexItem.vertex : point.vertexItem.vertex.key)
              }}
            />
          </Fragment>
        ))}
      </svg>
      {points.map((point, index) => (
        <Fragment key={`point-${index}`}>
          {typeof point.vertexItem.vertex === 'object' && (
            <span
              style={{
                position: 'absolute',
                zIndex: 1,
                top: point.y,
                left: point.x,
                transform: 'translate(-50%, calc(-50% - 15px))',
                paddingBottom: '8px',
                ...onClickCircle !== undefined && { cursor: 'pointer' }
              }}
              {...onClickCircle !== undefined && {
                onMouseEnter: () => onMouseEnterCircle(),
                onMouseOver: () => onMouseEnterCircle(),
                onMouseLeave: () => onMouseLeaveCircle(),
                onClick: () => onClickCircle(typeof point.vertexItem.vertex === 'number' ? point.vertexItem.vertex : point.vertexItem.vertex.key)
              }}
            >
                {point.vertexItem.vertex.element}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ParticlesPolygon;
