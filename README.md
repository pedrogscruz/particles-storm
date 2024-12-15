# The Particles Storm

The Particles Storm is a React library designed to create stunning **canvas-based** particle animations. It renders a swarm of dynamic particle elements that move gracefully across the screen. When particles get close to each other, they connect with lines that fade out smoothly as they move apart, providing an engaging and modern visual effect.

## Features
- **Dynamic Motion**: Particles move in random directions with smooth animations.
- **Canvas-Based Rendering**: Utilizes the HTML5 Canvas API for high-performance, efficient rendering, especially with large particle counts.
- **Interconnectivity**: Lines dynamically appear between particles when they are within a specified distance, and fade elegantly as they separate.
- **Highly Customizable**: Adjust particle count, size, motion speed, line connection distance, background color, and other properties to fit your design.

## Installation
To add The Particles Storm to your React project, install it via npm or yarn:
```bash
npm install particles-storm
# or
yarn add particles-storm
```

## Usage
Integrating The Particles Storm is quick and easy:
```jsx
import ParticleCanvas from 'particles-storm';

const App = () => (
  <ParticleCanvas
    width={800}
    height={600}
    numParticles={100}
    lineDistance={120}
    particleColor="#f39c12"
    lineColor="rgba(243, 156, 18, 0.6)"
    backgroundColor="black"
    speed={3}
    drift={0.5}
    sizeRange={[3, 6]}
    hidden={false}
  />
);

export default App;
```

## API
| Prop             | Type       | Default                   | Description                                |
|------------------|------------|---------------------------|--------------------------------------------|
| `width`          | `number`   | `800`                     | The width of the canvas container.         |
| `height`         | `number`   | `600`                     | The height of the canvas container.        |
| `numParticles`   | `number`   | `100`                     | Number of particles to display.            |
| `lineDistance`   | `number`   | `100`                     | Maximum distance for line connections.     |
| `particleColor`  | `string`   | `'#3498db'`               | Color of the particles.                    |
| `lineColor`      | `string`   | `'rgba(52, 152, 219, 0.5)'` | Color of the connecting lines.            |
| `backgroundColor`| `string`   | `'white'`                 | Background color of the canvas.            |
| `speed`          | `number`   | `2`                       | Speed of particle motion.                  |
| `drift`          | `number`   | `0.35`                    | Random drift factor for particle movement. |
| `sizeRange`      | `array`    | `[2, 4]`                  | Range of particle sizes (min, max).        |
| `hidden`         | `boolean`  | `false`                   | Whether to hide the canvas entirely.       |

## Customization
The library supports various levels of customization to help you achieve the desired look and feel for your application. Update colors, adjust sizes, and tweak the distance for connections to create unique animations that captivate users.

## Contribution
The Particles Storm is open source, and contributions are welcome. Help us improve or suggest new features by visiting our GitHub repository.

Bring life to your React applications with **The Particles Storm** and create engaging, interactive experiences with ease!
