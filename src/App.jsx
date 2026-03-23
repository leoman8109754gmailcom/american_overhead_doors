import Navbar from './navbar'
import Hero from './hero'
import AboutUs from './aboutus'
import Services from './services'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <AboutUs />
      <Services />
    </div>
  )
}

export default App
