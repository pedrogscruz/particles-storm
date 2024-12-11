# The Particles Storm

The Particles Storm is a React library designed to create stunning SVG-based particle animations. It renders a swarm of dynamic circle elements that move gracefully across the screen. When particles get close to each other, they connect with lines that fade out smoothly as they move apart, providing an engaging and modern visual effect.

## Features
- **Dynamic Motion**: Particles move in random directions with smooth animations.
- **SVG-Based Rendering**: Utilizes SVG elements for crisp, scalable graphics without relying on canvas.
- **Interconnectivity**: Lines dynamically appear between particles when they are within a specified distance, and fade elegantly as they separate.
- **Highly Customizable**: Adjust particle count, size, motion speed, line connection distance, and colors to fit your design.

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
import ParticleSVG from 'particles-storm';

const App = () => (
  <ParticleSVG
    width={800}
    height={600}
    numParticles={100}
    lineDistance={120}
    circleColor="#f39c12"
    lineColor="rgba(243, 156, 18, 0.6)"
  />
);

export default App;
```

## API
| Prop           | Type     | Default                   | Description                                |
|----------------|----------|---------------------------|--------------------------------------------|
| `width`        | `number` | `800`                     | The width of the SVG container.           |
| `height`       | `number` | `600`                     | The height of the SVG container.          |
| `numParticles` | `number` | `100`                     | Number of particles to display.           |
| `lineDistance` | `number` | `100`                     | Maximum distance for line connections.    |
| `circleColor`  | `string` | `'#3498db'`              | Color of the particle circles.            |
| `lineColor`    | `string` | `'rgba(52, 152, 219, 0.5)'` | Color of the connecting lines.            |

## Customization
The library supports various levels of customization to help you achieve the desired look and feel for your application. Update colors, adjust sizes, and tweak the distance for connections to create unique animations that captivate users.

## Contribution
The Particles Storm is open source, and contributions are welcome. Help us improve or suggest new features by visiting our GitHub repository.

Bring life to your React applications with **The Particles Storm** and create engaging, interactive experiences with ease!
