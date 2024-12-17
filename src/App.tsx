import ParticlesPolygon from "./components/particles-polygon"
import ParticlesStormBackground from "./components/particles-storm-background"

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'black' }}>
      <ParticlesStormBackground />
      <ParticlesPolygon
        vertices={[
          { key: 'react', element: <div>react</div> },
          { key: 'angular', element: <div>angular</div> },
          { key: 'vue', element: <div>vue</div> },
          { key: 'svelte', element: <div>svelte</div> },
          { key: 'astro', element: <div>astro</div> },
        ]}
        onClickCircle={key => console.log(key)}
      />
    </div>
  )
}

export default App
