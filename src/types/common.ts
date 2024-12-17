
export type Particle = { x: number, y: number, vx: number, vy: number, size: number, blurLevel: number }

export type Vertex = { key: string, element: React.ReactNode }

export type Vertices = { angle: number, radius: number, randomOffset: number, v: number, vertex: Vertex | number }
