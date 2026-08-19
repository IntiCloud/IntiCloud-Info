import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import TechStack from './components/TechStack'
import WorkProcess from './components/WorkProcess'
import Projects from './components/Projects'
import CodeSection from './components/CodeSection'
import SystemDemos from './components/SystemDemos'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <WorkProcess />
        <Projects />
        <CodeSection />
        <SystemDemos />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
